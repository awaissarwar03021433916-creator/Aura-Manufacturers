using Supabase;

namespace AuraManufacturers.Api.Services;

public class StorageService
{
    private readonly Client _supabase;
    private const string ProductBucket = "product-images";

    public StorageService(IConfiguration config)
    {
        var url = config["Supabase:Url"]!;
        var serviceKey = config["Supabase:ServiceRoleKey"]!;
        _supabase = new Client(url, serviceKey, new SupabaseOptions { AutoConnectRealtime = false });
        _supabase.InitializeAsync().GetAwaiter().GetResult();
    }

    public async Task<string> UploadProductImageAsync(Stream content, string fileName, string contentType)
    {
        using var ms = new MemoryStream();
        await content.CopyToAsync(ms);
        var bytes = ms.ToArray();

        var path = $"{Guid.NewGuid()}-{fileName}";
        await _supabase.Storage
            .From(ProductBucket)
            .Upload(bytes, path, new Supabase.Storage.FileOptions { ContentType = contentType, Upsert = false });

        return _supabase.Storage.From(ProductBucket).GetPublicUrl(path);
    }

    public async Task RemoveProductImageAsync(string publicUrl)
    {
        var marker = $"/{ProductBucket}/";
        var idx = publicUrl.IndexOf(marker, StringComparison.Ordinal);
        if (idx < 0) return;
        var path = publicUrl[(idx + marker.Length)..];
        await _supabase.Storage.From(ProductBucket).Remove(new List<string> { path });
    }
}
