using Core.Contracts.Entities;
using Core.Entities.Database;

namespace Core.Contracts.Repositories
{
    public interface IAssignmentRepository
    {
        Task<IEnumerable<IAssignment>> GetAllAssignmentsAsync(int userId);

        Task<IAssignment?> GetAssignmentByIdAsync(int id);

        Task CreateAssignmentAsync(Assignment assignment);

        Task<bool> DeleteAssignmentAsync(int id);

        Task<IEnumerable<IAssignment>> GetAllAssignmentsOfGroupAsync(int groupId);

        Task<bool> UpdateAssignmentAsync(Assignment assignment);
    }
}