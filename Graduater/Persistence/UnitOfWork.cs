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
        private AssignmentRepository? _assignmentRepository;

        public UnitOfWork()
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

        public IGroupRepository GroupRepository => throw new NotImplementedException();

        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }
    }
}