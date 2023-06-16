using Core.Contracts;
using Core.Contracts.Entities;
using Core.Contracts.Models;
using Core.Contracts.Repositories;
using Core.Contracts.Services;
using Core.Entities.Database;
using Core.Entities.Models;

namespace Service.Services
{
    public class AssignmentService : IAssignmentService
    {
        private readonly IUnitOfWork _unitOfWork;

        public AssignmentService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<IServiceResult> CreateAssignmentAsync(AssignmentPostPayload payload, int userId)
        {
            // create assignment and persist
            Assignment assignment = new Assignment();
            assignment.Title = payload.Title;
            assignment.Description = payload.Description;
            assignment.Due = payload.Due;
            assignment.Created = DateTime.UtcNow;
            assignment.UserId = userId;
            assignment.GroupId = payload.GroupId;
            assignment.Content = payload.Content;
            assignment.SubjectId = payload.SubjectId;

            await _unitOfWork.AssignmentRepository.CreateAssignmentAsync(assignment);
            await _unitOfWork.SaveChangesAsync();
            return ServiceResult.Completed;
        }

        public async Task<IServiceResult<IAssignment>> GetAssignmentByIdAsync(int id)
        {
            // get assignment by id
            var assignment = await _unitOfWork.AssignmentRepository.GetAssignmentByIdAsync(id);

            // check if assignment exists
            if (assignment == null)
            {
                return new ServiceResult<IAssignment>("Id", "Assignment not found");
            }

            // return assignment
            return new ServiceResult<IAssignment>(assignment);
        }

        public async Task<IServiceResult<ICollection<IAssignment>>> GetAssignmentsCreatedByUserAsync(int userId)
        {
            // get assignments created by user
            var assignments = await _unitOfWork.AssignmentRepository.GetAllAssignmentsAsync(userId);

            // return assignments
            return new ServiceResult<ICollection<IAssignment>>(assignments.ToList());
        }

        public async Task<IServiceResult<ICollection<IAssignment>>> GetAssignmentsForUserAsync(int userId)
        {
            var user = await _unitOfWork.UserRepository.GetUserByIdAsync(userId);
            if (user == null)
            {
                return new ServiceResult<ICollection<IAssignment>>("Id", "User not found");
            }

            var groups = await _unitOfWork.GroupRepository.GetAllForUserAsync(userId);

            var assignments = groups.Select(x => ((Group)x).Id).AsEnumerable().SelectMany(id => _unitOfWork.AssignmentRepository.GetAllAssignmentsOfGroupAsync(id).Result);

            return new ServiceResult<ICollection<IAssignment>>(assignments.ToList());
        }

        public async Task<IServiceResult<ICollection<IAssignment>>> GetAssignmentsOfGroupAsync(int groupId)
        {
            // get assignments of group
            var assignments = await _unitOfWork.AssignmentRepository.GetAllAssignmentsOfGroupAsync(groupId);

            // return assignments
            return new ServiceResult<ICollection<IAssignment>>(assignments.ToList());
        }

        public async Task<IServiceResult> UpdateAssignmentAsync(Assignment assignment)
        {
            // update assignment
            await _unitOfWork.AssignmentRepository.UpdateAssignmentAsync(assignment);

            // persist changes
            await _unitOfWork.SaveChangesAsync();

            // return completed service result
            return ServiceResult.Completed;
        }
    }
}