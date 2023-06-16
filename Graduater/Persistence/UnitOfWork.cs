using Core.Contracts;
using Core.Contracts.Repositories;
using Persistence.Repositories;

namespace Persistence
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _context;
        private UserRepository? _userRepository;
        private FileRepository? _fileRepository;

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

        public IFileRepository FileRepository
        {
            get
            {
                _fileRepository ??= new FileRepository(_context);
                return _fileRepository;
            }
        }

        public IAssignmentRepository AssignmentRepository { get; set; } = null!;

        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }
    }
}