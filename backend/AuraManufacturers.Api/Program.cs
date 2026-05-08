using AuraManufacturers.Api.Data;
using AuraManufacturers.Api.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

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


// 🔐 JWT
var jwtSecret = builder.Configuration["Supabase:JwtSecret"];

if (string.IsNullOrEmpty(jwtSecret))
{
    throw new Exception("❌ JWT Secret is missing");
}

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = true,
            ValidAudience = "authenticated",
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(jwtSecret))
        };
    });

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("Admin", p => p.RequireAuthenticatedUser());
});

builder.Services.AddSingleton<StorageService>();
builder.Services.AddScoped<ProductService>();


// 🌐 CORS
builder.Services.AddCors(o => o.AddDefaultPolicy(p =>
    p.WithOrigins(
            "http://localhost:3000",
            "http://127.0.0.1:3000",
            builder.Configuration["Frontend:Url"] ?? "http://localhost:3000"
        )
        .AllowAnyHeader()
        .AllowAnyMethod()));

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