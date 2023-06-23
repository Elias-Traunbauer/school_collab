using Core.Contracts;
using Core.Contracts.Repositories;
using Core.Entities.Database;
using Microsoft.EntityFrameworkCore;
using Persistence.Repositories;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence
{
    public class UnitOfWorkFillDB : IUnitOfWork
    {
        public readonly ApplicationDbContext _context;
        private UserRepository? _userRepository;
        private GroupRepository? _groupRepository;
        private FileRepository? _fileRepository;
        private AssignmentRepository? _assignmentRepository;

        public UnitOfWorkFillDB()
        {
            _context = new ApplicationDbContext();
        }

        public IUserRepository UserRepository
        {
            get
            {
                _userRepository ??= new UserRepository(_context);
                return _userRepository;
            }
        }

        public IAssignmentRepository AssignmentRepository
        {
            get
            {
                _assignmentRepository ??= new AssignmentRepository(_context);
                return _assignmentRepository;
            }
        }

        public IFileRepository FileRepository
        {
            get
            {
                _fileRepository ??= new FileRepository(_context);
                return _fileRepository;
            }
        }

        public IGroupRepository GroupRepository
        {
            get
            {
                _groupRepository ??= new GroupRepository(_context);
                return _groupRepository;
            }
        }

        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }

        public async Task Init()
        {
            await DeleteDatabaseAsync();
            await MigrateDatabaseAsync();
        }


        public async Task DeleteDatabaseAsync() => await _context!.Database.EnsureDeletedAsync();
        public async Task MigrateDatabaseAsync() => await _context!.Database.MigrateAsync();

        public async ValueTask DisposeAsync()
        {
            await DisposeAsync(true);
            GC.SuppressFinalize(this);
        }

        protected virtual async ValueTask DisposeAsync(bool disposing)
        {
            if (disposing)
            {
                await _context.DisposeAsync();
            }
        }

        public void Dispose()
        {
            _context.Dispose();
        }

        public async Task<List<User>> GetAllUsersAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<string> GetVerificationTokenAsync(int id)
        {
            var user =  await _context.Users.FirstOrDefaultAsync(x => x.Id == id);

            if (user != null && user.EmailVerificationToken != null)
                return user.EmailVerificationToken;

            return "";
        }
    }
}
