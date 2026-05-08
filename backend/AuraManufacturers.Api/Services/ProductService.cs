using AuraManufacturers.Api.Data;
using AuraManufacturers.Api.Dtos;
using AuraManufacturers.Api.Models;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using System.Text.RegularExpressions;

namespace AuraManufacturers.Api.Services;

/// <summary>Thrown when a slug is already in use by another product (race-safety net).</summary>
public class DuplicateSlugException : Exception
{
    public string Slug { get; }
    public DuplicateSlugException(string slug)
        : base($"A product with slug '{slug}' already exists.") => Slug = slug;
}

public class ProductService
{
    private readonly AppDbContext _db;

    public ProductService(AppDbContext db) => _db = db;

    public async Task<List<ProductDto>> ListAsync(bool publicOnly)
    {
        var q = _db.Products.AsQueryable();
        if (publicOnly) q = q.Where(p => p.IsActive);
        return await q
            .OrderByDescending(p => p.CreatedAt)
            .Select(p => Map(p))
            .ToListAsync();
    }

    public async Task<ProductDto?> GetBySlugAsync(string slug) =>
        await _db.Products.Where(p => p.Slug == slug).Select(p => Map(p)).FirstOrDefaultAsync();

    public async Task<ProductDto?> GetByIdAsync(Guid id) =>
        await _db.Products.Where(p => p.Id == id).Select(p => Map(p)).FirstOrDefaultAsync();

    public async Task<ProductDto> CreateAsync(ProductCreateDto dto)
    {
        // Sanitise + auto-uniquify slug before insert. Falls back to name if blank.
        var baseSlug = Slugify(string.IsNullOrWhiteSpace(dto.Slug) ? dto.Name : dto.Slug);
        if (string.IsNullOrWhiteSpace(baseSlug))
            baseSlug = $"product-{DateTimeOffset.UtcNow.ToUnixTimeSeconds()}";

        var uniqueSlug = await GenerateUniqueSlugAsync(baseSlug, excludeId: null);

        var p = new Product
        {
            Name = dto.Name,
            Slug = uniqueSlug,
            Description = dto.Description,
            Price = dto.Price,
            Category = dto.Category,
            Images = dto.Images,
            IsFeatured = dto.IsFeatured,
            IsActive = dto.IsActive
        };
        _db.Products.Add(p);

        try
        {
            await _db.SaveChangesAsync();
        }
        catch (DbUpdateException ex) when (IsUniqueViolation(ex))
        {
            // Race: someone else inserted the same slug between our check and save.
            // Roll back, regenerate with a timestamp suffix, and retry once.
            _db.Entry(p).State = EntityState.Detached;
            p.Slug = $"{baseSlug}-{DateTimeOffset.UtcNow.ToUnixTimeSeconds()}";
            _db.Products.Add(p);
            try
            {
                await _db.SaveChangesAsync();
            }
            catch (DbUpdateException ex2) when (IsUniqueViolation(ex2))
            {
                throw new DuplicateSlugException(p.Slug);
            }
        }

        return Map(p);
    }

    public async Task<ProductDto?> UpdateAsync(Guid id, ProductUpdateDto dto)
    {
        var p = await _db.Products.FindAsync(id);
        if (p is null) return null;

        var requestedSlug = Slugify(string.IsNullOrWhiteSpace(dto.Slug) ? dto.Name : dto.Slug);
        if (string.IsNullOrWhiteSpace(requestedSlug))
            requestedSlug = p.Slug; // keep existing if user blanks it out

        // Only re-uniquify if the slug actually changed.
        if (!string.Equals(requestedSlug, p.Slug, StringComparison.Ordinal))
        {
            requestedSlug = await GenerateUniqueSlugAsync(requestedSlug, excludeId: id);
        }

        p.Name = dto.Name;
        p.Slug = requestedSlug;
        p.Description = dto.Description;
        p.Price = dto.Price;
        p.Category = dto.Category;
        p.Images = dto.Images;
        p.IsFeatured = dto.IsFeatured;
        p.IsActive = dto.IsActive;

        try
        {
            await _db.SaveChangesAsync();
        }
        catch (DbUpdateException ex) when (IsUniqueViolation(ex))
        {
            throw new DuplicateSlugException(p.Slug);
        }

        return Map(p);
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var p = await _db.Products.FindAsync(id);
        if (p is null) return false;
        _db.Products.Remove(p);
        await _db.SaveChangesAsync();
        return true;
    }

    // ---- helpers ----

    /// <summary>
    /// Returns <paramref name="baseSlug"/> if it isn't taken, otherwise appends -1, -2, …
    /// until a free one is found. <paramref name="excludeId"/> lets the caller ignore
    /// the row currently being updated.
    /// </summary>
    private async Task<string> GenerateUniqueSlugAsync(string baseSlug, Guid? excludeId)
    {
        // Pull every existing slug that starts with our base — usually a tiny set —
        // so the loop is in-memory and doesn't issue a query per attempt.
        var taken = await _db.Products
            .Where(p => p.Slug == baseSlug || p.Slug.StartsWith(baseSlug + "-"))
            .Where(p => excludeId == null || p.Id != excludeId)
            .Select(p => p.Slug)
            .ToListAsync();

        if (!taken.Contains(baseSlug, StringComparer.Ordinal))
            return baseSlug;

        for (int i = 1; i <= 1000; i++)
        {
            var candidate = $"{baseSlug}-{i}";
            if (!taken.Contains(candidate, StringComparer.Ordinal))
                return candidate;
        }

        // Extremely unlikely fallback: timestamp suffix.
        return $"{baseSlug}-{DateTimeOffset.UtcNow.ToUnixTimeSeconds()}";
    }

    private static string Slugify(string input)
    {
        if (string.IsNullOrWhiteSpace(input)) return string.Empty;
        var lower = input.Trim().ToLowerInvariant();
        var hyphenated = Regex.Replace(lower, @"[^a-z0-9]+", "-");
        return hyphenated.Trim('-');
    }

    private static bool IsUniqueViolation(DbUpdateException ex) =>
        ex.InnerException is PostgresException pg && pg.SqlState == "23505";

    private static ProductDto Map(Product p) =>
        new(p.Id, p.Name, p.Slug, p.Description, p.Price, p.Category, p.Images, p.IsFeatured, p.IsActive);
}
