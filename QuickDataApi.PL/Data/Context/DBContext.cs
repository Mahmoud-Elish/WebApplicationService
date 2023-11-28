using Microsoft.EntityFrameworkCore;
namespace QuickDataApi.PL;

public class DBContext : DbContext
{
    public DbSet<Record> Records => Set<Record>();
    public DBContext(DbContextOptions<DBContext> options) : base(options) { }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Seed initial data
        modelBuilder.Entity<Record>().HasData(
            new Record { Id = 1, Name = "John Doe", Activated = true },
            new Record { Id = 2, Name = "Mona", Activated = false },
            new Record { Id = 3, Name = "Ali", Activated = false },
            new Record { Id = 4, Name = "Osama", Activated = true }

        );
    }
}
