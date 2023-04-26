using Core.Contracts.Entities;
using Core.Entities;
using Core.Entities.Database;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

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
