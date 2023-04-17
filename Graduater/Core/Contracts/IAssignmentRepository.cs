using Core.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Contracts
{
    public interface IAssignmentRepository
    {
        Task<IEnumerable<Assignment>> GetAllAssignmentsAsync();
        Task<Assignment?> GetAssignmentByIdAsync(int id);
        Task<Assignment?> GetAssignmentByTitleAsync(string title);

        Task<ValidationResult> CreateAssignmentAsync(Assignment assignment);
        Task<ValidationResult> UpdateAssignmentAsync(Assignment assignment);
        Task<ValidationResult> DeleteAssignmentAsync(int id);
    }
}
