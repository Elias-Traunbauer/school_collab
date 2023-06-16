﻿using Core.Contracts;
using Core.Contracts.Repositories;
using Core.Entities.Database;
using Persistence.Repositories;

namespace Service.Test.Mocks
{
    /// <summary>
    /// Mock for UnitOfWork
    /// </summary>
    internal class UnitOfWorkForTests : IUnitOfWork
    {
        private readonly ApplicationDbContextForTesting _appDbContext;

        public IFileRepository FileRepository { get; }
        public IUserRepository UserRepository { get; set; }

        public IAssignmentRepository AssignmentRepository { get; set; }

        public IGroupRepository GroupRepository { get; set; }

        public UnitOfWorkForTests()
        {
            _appDbContext = new ApplicationDbContextForTesting();
            UserRepository = new UserRepository(_appDbContext);
            FileRepository = new FileRepository(_appDbContext);
            GroupRepository = new GroupRepository(_appDbContext);
            AssignmentRepository = new AssignmentRepository(_appDbContext);
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