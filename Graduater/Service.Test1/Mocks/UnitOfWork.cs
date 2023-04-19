using Core.Contracts;
using Core.Contracts.Repositories;
using Core.Entities.Database;
using Microsoft.EntityFrameworkCore;
using Moq;
using Moq.EntityFrameworkCore;
using Org.BouncyCastle.Asn1.X509.Qualified;
using Persistence;
using Persistence.Repositories;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Test.Mocks
{
    /// <summary>
    /// Mock for UnitOfWork
    /// </summary>
    internal class UnitOfWorkForTests : IUnitOfWork
    {
        private readonly ApplicationDbContext _appDbContext;

        public IUserRepository UserRepository { get; set; }

        public IAssignmentRepository? AssignmentRepository { get; set; }

        public UnitOfWorkForTests() 
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: "TestDB")
                .Options;

            _appDbContext = new ApplicationDbContext(options);
            UserRepository = new UserRepository(_appDbContext);
        }

        public UnitOfWorkForTests WithEntity(DatabaseEntity entity)
        {
            _appDbContext.Add(entity);
            return this;
        }

        public async Task<bool> SaveChangesAsync()
        {
            //_appDbContext.SaveChanges();
            return true;
        }
    }
}
