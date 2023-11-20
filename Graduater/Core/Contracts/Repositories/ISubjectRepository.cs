using Core.Contracts.Entities;
using Core.Contracts.Models;
using Core.Entities.Database;

namespace Core.Contracts.Repositories
{
    // group methods
    public interface ISubjectRepository
    {
        Task CreateSubjectAsync(Subject subject);
        Task DeleteSubjectByIdAsync(int id);
        Task<ISubject> GetByIdAsync(int id);
        Task<IServiceResult<ICollection<ISubject>>> SearchSubjectsAsync(string name);
    }
}