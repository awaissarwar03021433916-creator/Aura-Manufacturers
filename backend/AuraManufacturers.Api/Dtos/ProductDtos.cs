namespace AuraManufacturers.Api.Dtos;

public record ProductDto(
    Guid Id,
    string Name,
    string Slug,
    string? Description,
    decimal Price,
    string? Category,
    List<string> Images,
    bool IsFeatured,
    bool IsActive
);

public record ProductCreateDto(
    string Name,
    string Slug,
    string? Description,
    decimal Price,
    string? Category,
    List<string> Images,
    bool IsFeatured = false,
    bool IsActive = true
);

public record ProductUpdateDto(
    string Name,
    string Slug,
    string? Description,
    decimal Price,
    string? Category,
    List<string> Images,
    bool IsFeatured,
    bool IsActive
);
