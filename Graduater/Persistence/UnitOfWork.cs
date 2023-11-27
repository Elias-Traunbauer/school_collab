using Core.Contracts;
using Core.Contracts.Repositories;
using Core.Entities.Database;
using Microsoft.EntityFrameworkCore;
using Persistence.Repositories;
using System.Data.Entity;

namespace Persistence
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _context;
        private UserRepository? _userRepository;
        private GroupRepository? _groupRepository;
        private FileRepository? _fileRepository;
        private AssignmentRepository? _assignmentRepository;
        private SubjectRepository? _subjectRepository;
        private ChatRepository? _chatRepository;
        private SummaryRepository? _summaryRepository;

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

        public IGroupRepository GroupRepository
        {
            get
            {
                _groupRepository ??= new GroupRepository(_context);
                return _groupRepository;
            }
        }

        public ISubjectRepository SubjectRepository {
            get
            {
                _subjectRepository ??= new SubjectRepository(_context);
                return _subjectRepository;
            }
        }

        public IChatRepository ChatRepository
        {
            get
            {
                _chatRepository ??= new ChatRepository(_context);
                return _chatRepository;
            }
        }

        public ISummaryRepository SummaryRepository
        {
            get
            {
                _summaryRepository ??= new SummaryRepository(_context);
                return _summaryRepository;
            }
        }

        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync()) > 0;
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
    }
}