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
        private readonly ApplicationDbContextForTesting _appDbContext;

        public IUserRepository UserRepository { get; set; }

        public IAssignmentRepository AssignmentRepository { get; set; }

        public UnitOfWorkForTests() 
        {
            _appDbContext = new ApplicationDbContextForTesting();
            UserRepository = new UserRepository(_appDbContext);
            AssignmentRepository = null!;
        }

        public UnitOfWorkForTests WithEntity(DatabaseEntity entity)
        {
            _appDbContext.Add(entity);
            _appDbContext.SaveChanges();
            return this;
        }

        public async Task<bool> SaveChangesAsync()
        {
            await _appDbContext.SaveChangesAsync();
            return true;
        }
    }
}
