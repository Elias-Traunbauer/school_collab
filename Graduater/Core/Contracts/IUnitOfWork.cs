using Core.Contracts.Repositories;

namespace Core.Contracts
{
    public interface IUnitOfWork : IAsyncDisposable, IDisposable
    {
        public IFileRepository FileRepository { get; }
        public IUserRepository UserRepository { get; }
        public IAssignmentRepository AssignmentRepository { get; }
        public IGroupRepository GroupRepository { get; }
        public ISubjectRepository SubjectRepository { get; }
        public IChatRepository ChatRepository { get; }
        public ISummaryRepository SummaryRepository { get; }
        public IGenericRepository<int> GenericRepository { get; }

        public Task<bool> SaveChangesAsync();
    }
}