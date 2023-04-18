using Core.Contracts;
using Core.Contracts.Repositories;
using Persistence.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _context;
        private UserRepository? _userRepository;

        public UnitOfWork()
        {
            _context = new ApplicationDbContext();
            //AssignmentRepository = new AssignmentRepository(_context, _config);
        }

        public IUserRepository UserRepository
        {
            get
            {
                _userRepository ??= new UserRepository(_context);
                return _userRepository;
            }
        }

        public IAssignmentRepository AssignmentRepository { get; set; } = null!;

        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }
    }
}
