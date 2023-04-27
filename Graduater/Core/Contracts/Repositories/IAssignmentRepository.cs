using Core.Contracts.Entities;
using Core.Entities.Database;

namespace Core.Contracts.Repositories
{
    public interface IAssignmentRepository
    {
        Task<IEnumerable<IAssignment>> GetAllAssignmentsAsync();

        Task<IAssignment?> GetAssignmentByIdAsync(int id);

        Task CreateAssignmentAsync(Assignment assignment);

        Task<bool> DeleteAssignmentAsync(int id);
    }
}