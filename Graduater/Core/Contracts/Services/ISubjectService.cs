using Core.Contracts.Entities;
using Core.Contracts.Models;
using Core.Entities.Database;

namespace Core.Contracts.Services
{
    public interface ISubjectService
    {
        Task<IServiceResult<ICollection<ISubject>>> SearchSubjectsAsync(string name);
        Task<IServiceResult<ISubject>> GetSubjectAsync(int id);
        Task<IServiceResult<int>> CreateSubjectAsync(Subject subject);
        Task<IServiceResult> DeleteSubjectAsync(int id);
        Task<IServiceResult<List<Subject>>> GetAllSubjectsAsync();
    }
}