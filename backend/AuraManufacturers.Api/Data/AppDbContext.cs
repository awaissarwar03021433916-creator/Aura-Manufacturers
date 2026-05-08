using AuraManufacturers.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace AuraManufacturers.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Product> Products => Set<Product>();
    public DbSet<ContactMessage> ContactMessages => Set<ContactMessage>();

    protected override void OnModelCreating(ModelBuilder b)
    {
        b.Entity<Product>(e =>
        {
            e.ToTable("products");
            e.Property(x => x.Id).HasColumnName("id");
            e.Property(x => x.Name).HasColumnName("name");
            e.Property(x => x.Slug).HasColumnName("slug");
            e.Property(x => x.Description).HasColumnName("description");
            e.Property(x => x.Price).HasColumnName("price");
            e.Property(x => x.Category).HasColumnName("category");
            e.Property(x => x.Images).HasColumnName("images");
            e.Property(x => x.IsFeatured).HasColumnName("is_featured");
            e.Property(x => x.IsActive).HasColumnName("is_active");
            e.Property(x => x.CreatedAt).HasColumnName("created_at");
            e.Property(x => x.UpdatedAt).HasColumnName("updated_at");
            e.HasIndex(x => x.Slug).IsUnique();
        });

        b.Entity<ContactMessage>(e =>
        {
            e.ToTable("contact_messages");
            e.Property(x => x.Id).HasColumnName("id");
            e.Property(x => x.Name).HasColumnName("name");
            e.Property(x => x.Email).HasColumnName("email");
            e.Property(x => x.Phone).HasColumnName("phone");
            e.Property(x => x.Message).HasColumnName("message");
            e.Property(x => x.CreatedAt).HasColumnName("created_at");
        });
    }
}
