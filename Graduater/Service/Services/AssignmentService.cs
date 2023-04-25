using Core.Contracts.Entities;
using Core.Contracts.Models;
using Core.Contracts.Services;
using Core.Entities.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services
{
    public class AssignmentService : IAssignmentService
    {
        public Task<IServiceResult> CreateAssignmentAsync(AssignmentPostPayload payload, int userId)
        {
            throw new NotImplementedException();
        }

        public Task<IServiceResult<IAssignment>> GetAssignmentByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IServiceResult<ICollection<IAssignment>>> GetAssignmentsCreatedByUserAsync(int userId)
        {
            throw new NotImplementedException();
        }

        public Task<IServiceResult<ICollection<IAssignment>>> GetAssignmentsForUserAsync(int userId)
        {
            throw new NotImplementedException();
        }

        public Task<IServiceResult<ICollection<IAssignment>>> GetAssignmentsOfGroupAsync(int groupId)
        {
            throw new NotImplementedException();
        }

        public Task<IServiceResult> UpdateAssignmentAsync(Assignment assignment)
        {
            throw new NotImplementedException();
        }
    }
}
