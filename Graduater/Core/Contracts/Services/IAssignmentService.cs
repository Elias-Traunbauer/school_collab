using Core.Contracts.Entities;
using Core.Contracts.Models;
using Core.Entities.Database;

namespace Core.Contracts.Services
{
    public interface IAssignmentService
    {
        Task<IServiceResult<ICollection<IAssignment>>> GetAssignmentsOfGroupAsync(int groupId);

        Task<IServiceResult<ICollection<IAssignment>>> GetAssignmentsForUserAsync(int userId);

        Task<IServiceResult<ICollection<IAssignment>>> GetAssignmentsCreatedByUserAsync(int userId);

        Task<IServiceResult> CreateAssignmentAsync(AssignmentPostPayload payload, int userId);

        Task<IServiceResult<IAssignment>> GetAssignmentByIdAsync(int id);

        Task<IServiceResult> UpdateAssignmentAsync(Assignment assignment);
    }
}