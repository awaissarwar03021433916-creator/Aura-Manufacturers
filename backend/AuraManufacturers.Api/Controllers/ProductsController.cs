using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using AuraManufacturers.Api.Services;
using AuraManufacturers.Api.Dtos;

[ApiController]
[Route("api/products")]
public class ProductsController : ControllerBase
{
    private readonly ProductService _products;
    private readonly StorageService _storage;

    public ProductsController(ProductService products, StorageService storage)
    {
        _products = products;
        _storage = storage;
    }

    [HttpGet]
    public async Task<IActionResult> List() => Ok(await _products.ListAsync(publicOnly: true));

    [HttpGet("{slug}")]
    public async Task<IActionResult> GetBySlug(string slug)
    {
        var p = await _products.GetBySlugAsync(slug);
        return p is null ? NotFound() : Ok(p);
    }

    [HttpGet("admin/all")]
    public async Task<IActionResult> ListAll() => Ok(await _products.ListAsync(publicOnly: false));

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] ProductCreateDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Name))
            return BadRequest(new { error = "Name is required." });

        try
        {
            var created = await _products.CreateAsync(dto);
            return CreatedAtAction(nameof(GetBySlug), new { slug = created.Slug }, created);
        }
        catch (DuplicateSlugException ex)
        {
            return Conflict(new { error = ex.Message, slug = ex.Slug });
        }
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] ProductUpdateDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Name))
            return BadRequest(new { error = "Name is required." });

        try
        {
            var updated = await _products.UpdateAsync(id, dto);
            return updated is null ? NotFound() : Ok(updated);
        }
        catch (DuplicateSlugException ex)
        {
            return Conflict(new { error = ex.Message, slug = ex.Slug });
        }
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id) =>
        await _products.DeleteAsync(id) ? NoContent() : NotFound();

    [HttpPost("upload-image")]
    public async Task<IActionResult> UploadImage([FromForm] IFormFile file)
    {
        if (file is null || file.Length == 0) return BadRequest("No file");
        await using var stream = file.OpenReadStream();
        var url = await _storage.UploadProductImageAsync(stream, file.FileName, file.ContentType);
        return Ok(new { url });
    }
}