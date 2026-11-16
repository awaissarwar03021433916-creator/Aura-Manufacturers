using AuraManufacturers.Api.Data;
using AuraManufacturers.Api.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Protocols;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// 🔥 FORCE correct configuration loading
builder.Configuration
    .AddJsonFile("appsettings.json", optional: false)
    .AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", optional: true)
    .AddUserSecrets<Program>(optional: true)
    .AddEnvironmentVariables();


// 🔍 DEBUG: print connection string
var connectionString = builder.Configuration.GetConnectionString("Supabase");
Console.WriteLine("👉 USING CONNECTION STRING:");
Console.WriteLine(connectionString);

// ❗ Fail fast
if (string.IsNullOrEmpty(connectionString))
{
    throw new Exception("❌ Supabase connection string is NULL");
}

// 🔧 Connection-string hardening for Supabase pooler / direct Postgres.
//    Adds bounded pool, TCP keepalive (so pgbouncer doesn't silently drop us),
//    and conservative timeouts so a stuck socket fails fast instead of hanging.
{
    var csb = new Npgsql.NpgsqlConnectionStringBuilder(connectionString);

    if (csb.MaxPoolSize == 100) csb.MaxPoolSize = 20;          // default 100 -> 20
    if (csb.MinPoolSize == 0)   csb.MinPoolSize = 1;
    if (csb.ConnectionIdleLifetime == 300) csb.ConnectionIdleLifetime = 15;
    if (csb.Timeout == 15) { /* already set */ } else csb.Timeout = 15;
    if (csb.CommandTimeout == 30) csb.CommandTimeout = 15;
    csb.KeepAlive          = 30;     // send TCP keepalive every 30s
    csb.TcpKeepAlive       = true;   // OS-level TCP keepalive on
    csb.NoResetOnClose     = true;   // safe with Supabase pgbouncer (transaction mode)
    csb.Pooling            = true;
    csb.Multiplexing       = false;  // pgbouncer transaction mode is incompatible with multiplexing
    csb.SslMode            = Npgsql.SslMode.Require;
    csb.TrustServerCertificate = true;

    connectionString = csb.ToString();
    Console.WriteLine("👉 POOL-TUNED CONNECTION STRING APPLIED");
}


// ✅ EF Core (pooled) with retry-on-failure for transient pgbouncer / network blips.
//    EnableRetryOnFailure transparently retries operations that fail with a
//    transient NpgsqlException (timeouts, connection-reset, broken-stream, etc.)
//    so you don't see a user-facing 500 for what is essentially a flap.
builder.Services.AddDbContextPool<AppDbContext>(opts =>
    opts.UseNpgsql(connectionString, npgsql =>
        {
            npgsql.EnableRetryOnFailure(
                maxRetryCount: 5,
                maxRetryDelay: TimeSpan.FromSeconds(3),
                errorCodesToAdd: null);
            npgsql.CommandTimeout(15);
        })
        .EnableDetailedErrors()
        .EnableSensitiveDataLogging());


// 🔐 JWT — Supabase signs user access tokens with asymmetric ES256 keys published at
//    {Supabase:Url}/auth/v1/.well-known/jwks.json. Only those keys are trusted; the legacy
//    HS256 secret is deliberately NOT accepted (anyone holding it could mint tokens).
var supabaseUrl = builder.Configuration["Supabase:Url"]?.TrimEnd('/');

if (string.IsNullOrEmpty(supabaseUrl))
{
    throw new Exception("❌ Supabase:Url is missing");
}

var supabaseIssuer = $"{supabaseUrl}/auth/v1";
var jwksUrl = $"{supabaseIssuer}/.well-known/jwks.json";

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.MapInboundClaims = false;
        options.ConfigurationManager = new ConfigurationManager<OpenIdConnectConfiguration>(
            jwksUrl,
            new SupabaseJwksRetriever(),
            new HttpDocumentRetriever { RequireHttps = jwksUrl.StartsWith("https://", StringComparison.OrdinalIgnoreCase) });

        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = supabaseIssuer,
            ValidateAudience = true,
            ValidAudience = "authenticated",
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidAlgorithms = new[] { SecurityAlgorithms.EcdsaSha256, SecurityAlgorithms.RsaSha256 }
        };
    });

// 🛡️ Admin = signed-in Supabase user whose email is on the Admin:Emails allowlist
//    (comma-separated; set via env var Admin__Emails). Public sign-up is enabled on the
//    Supabase project, so "authenticated" alone is NOT enough once the allowlist is set.
var adminEmails = new HashSet<string>(
    (builder.Configuration["Admin:Emails"] ?? "")
        .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries),
    StringComparer.OrdinalIgnoreCase);

if (adminEmails.Count == 0)
{
    Console.WriteLine("⚠️ Admin:Emails is empty — ANY signed-in Supabase user is treated as admin. Set Admin__Emails to lock this down.");
}

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("Admin", p => p
        .RequireAuthenticatedUser()
        .RequireAssertion(ctx =>
            adminEmails.Count == 0 ||
            (ctx.User.FindFirst("email")?.Value is { } email && adminEmails.Contains(email))));
});

builder.Services.AddSingleton<StorageService>();
builder.Services.AddScoped<ProductService>();


// 🌐 CORS — local dev + Vercel production + Vercel preview deployments + custom domains.
//   - Exact origins from a hard-coded baseline + comma-separated env override (Frontend:Url).
//   - Vercel preview deployments (aura-manufacturers-git-*.vercel.app) are accepted via predicate.
//   - GET / POST / PUT / DELETE / PATCH / OPTIONS all permitted.
//   - Any header allowed (Authorization, Content-Type, multipart for image uploads, etc.).
{
    var allowedOrigins = new HashSet<string>(StringComparer.OrdinalIgnoreCase)
    {
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://aura-manufacturers.vercel.app",
        "https://www.auramanufacturers.com",
        "https://auramanufacturers.com",
    };

    // Optional comma-separated extra origins from env (e.g. custom production domain)
    var fromEnv = builder.Configuration["Frontend:Url"];
    if (!string.IsNullOrWhiteSpace(fromEnv))
    {
        foreach (var raw in fromEnv.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries))
        {
            allowedOrigins.Add(raw.TrimEnd('/'));
        }
    }

    Console.WriteLine("👉 CORS allowed origins:");
    foreach (var o in allowedOrigins) Console.WriteLine($"   · {o}");
    Console.WriteLine("   · (regex) https://aura-manufacturers*.vercel.app  — preview deployments");

    builder.Services.AddCors(o => o.AddDefaultPolicy(p =>
        p.SetIsOriginAllowed(origin =>
        {
            if (string.IsNullOrEmpty(origin)) return false;
            if (allowedOrigins.Contains(origin)) return true;
            try
            {
                var host = new Uri(origin).Host;
                // Allow Vercel preview deployments scoped to this project only
                return host.EndsWith(".vercel.app", StringComparison.OrdinalIgnoreCase)
                    && host.StartsWith("aura-manufacturers", StringComparison.OrdinalIgnoreCase);
            }
            catch
            {
                return false;
            }
        })
        .WithMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
        .AllowAnyHeader()
        .WithExposedHeaders("Content-Disposition", "Content-Length")
        .SetPreflightMaxAge(TimeSpan.FromHours(1))
    ));
}

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();


// 🔥 GLOBAL ERROR HANDLER (VERY IMPORTANT)
app.UseExceptionHandler(errorApp =>
{
    errorApp.Run(async context =>
    {
        var exceptionHandlerPathFeature = context.Features.Get<Microsoft.AspNetCore.Diagnostics.IExceptionHandlerPathFeature>();
        var error = exceptionHandlerPathFeature?.Error;

        Console.WriteLine("🔥 ERROR OCCURRED:");
        Console.WriteLine(error?.ToString());

        context.Response.StatusCode = 500;
        await context.Response.WriteAsync(error?.Message ?? "Unknown error");
    });
});


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();
app.UseAuthentication();
app.UseAuthorization();

app.MapGet("/health", () => Results.Ok(new { status = "ok" }));


// 🔥 TEST DB CONNECTION ON STARTUP
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    try
    {
        Console.WriteLine("🔍 Testing DB connection...");
        db.Database.CanConnect();
        Console.WriteLine("✅ DB CONNECTED SUCCESSFULLY");
    }
    catch (Exception ex)
    {
        Console.WriteLine("❌ DB CONNECTION FAILED:");
        Console.WriteLine(ex.Message);
    }
}

app.MapControllers();

app.Run();