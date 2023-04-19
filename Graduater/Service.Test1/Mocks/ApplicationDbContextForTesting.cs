using Core.Entities.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Persistence;

namespace Service.Test.Mocks;

public partial class ApplicationDbContextForTesting : ApplicationDbContext
{
    public ApplicationDbContextForTesting() : base()
    {
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseInMemoryDatabase(Guid.NewGuid().ToString());
    }
}
