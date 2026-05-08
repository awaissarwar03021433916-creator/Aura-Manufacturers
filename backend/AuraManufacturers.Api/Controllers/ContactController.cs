using AuraManufacturers.Api.Data;
using AuraManufacturers.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AuraManufacturers.Api.Controllers;

public record ContactSubmissionDto(string? Name, string? Email, string? Phone, string Message);

[ApiController]
[Route("api/contact")]
public class ContactController : ControllerBase
{
    private readonly AppDbContext _db;
    public ContactController(AppDbContext db) => _db = db;

    [HttpPost]
    public async Task<IActionResult> Submit([FromBody] ContactSubmissionDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Message))
            return BadRequest("Message is required");

        var msg = new ContactMessage
        {
            Name = dto.Name,
            Email = dto.Email,
            Phone = dto.Phone,
            Message = dto.Message
        };
        _db.ContactMessages.Add(msg);
        await _db.SaveChangesAsync();
        return Ok(new { id = msg.Id });
    }

    [HttpGet]
    [Authorize(Policy = "Admin")]
    public async Task<IActionResult> List()
    {
        var messages = await _db.ContactMessages
            .OrderByDescending(m => m.CreatedAt)
            .Take(200)
            .ToListAsync();
        return Ok(messages);
    }
}
