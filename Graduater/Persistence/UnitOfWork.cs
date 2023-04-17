using Core.Contracts;
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
        private readonly ApiConfig _config;

        public UnitOfWork(ApiConfig config)
        {
            _config = config;
            _context = new ApplicationDbContext(config);
            UserRepository = new UserRepository(_context, _config);
            //AssignmentRepository = new AssignmentRepository(_context, _config);
        }

        public IUserRepository UserRepository { get; set; }

        public IAssignmentRepository AssignmentRepository { get; set; } = null!;

        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }
    }
}
