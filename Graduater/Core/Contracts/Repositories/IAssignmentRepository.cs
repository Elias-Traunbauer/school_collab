using Core.Contracts.Entities;
using Core.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Contracts.Repositories
{
    public interface IAssignmentRepository
    {
        Task<IEnumerable<IAssignment>> GetAllAssignmentsAsync();
        Task<IAssignment?> GetAssignmentByIdAsync(int id);
        Task<IAssignment?> GetAssignmentByTitleAsync(string title);

        Task CreateAssignmentAsync(IAssignment assignment);
        Task<bool> DeleteAssignmentAsync(int id);
    }
}
