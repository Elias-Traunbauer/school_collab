using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Service.Test.Mocks;

public partial class ApplicationDbContextForTesting : ApplicationDbContext
{
    public ApplicationDbContextForTesting() : base()
    {
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder
            .UseInMemoryDatabase(Guid.NewGuid().ToString());
    }
}