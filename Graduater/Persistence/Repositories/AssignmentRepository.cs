using Core.Contracts.Entities;
using Core.Contracts.Repositories;
using Core.Entities.Database;
using Microsoft.EntityFrameworkCore;

namespace Persistence.Repositories
{
    public class AssignmentRepository : IAssignmentRepository
    {
        private readonly ApplicationDbContext _context;

        public AssignmentRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task CreateAssignmentAsync(Assignment assignment)
        {
            if (assignment == null) throw new ArgumentNullException(nameof(assignment));
            await _context.Assignments.AddAsync(assignment);
        }

        public async Task<bool> DeleteAssignmentAsync(int id)
        {
            Assignment? assignment = (Assignment?)await GetAssignmentByIdAsync(id);
            if (assignment == null) return false;
            _context.Assignments.Remove(assignment);
            return true;
        }

        public async Task<IEnumerable<IAssignment>> GetAllAssignmentsAsync(int userId)
        {
            var res = _context.Assignments.Where(x => x.UserId == userId);
            return await res.ToListAsync();
        }

        public async Task<IAssignment?> GetAssignmentByIdAsync(int id)
        {
            var assignments = _context.Assignments.Where(x => x.Id == id);
            return await assignments.SingleOrDefaultAsync();
        }

        public async Task<bool> UpdateAssignmentAsync(Assignment assignment)
        {
            if (assignment == null) throw new ArgumentNullException(nameof(assignment));
            Assignment? assignmentToUpdate = (Assignment?)await GetAssignmentByIdAsync(assignment.Id);
            if (assignmentToUpdate == null) return false;
            assignmentToUpdate.Title = assignment.Title;
            assignmentToUpdate.Description = assignment.Description;
            assignmentToUpdate.Due = assignment.Due;
            assignmentToUpdate.GroupId = assignment.GroupId;
            return true;
        }

        public async Task<IEnumerable<IAssignment>> GetAllAssignmentsOfGroupAsync(int groupId)
        {

            var res = _context.Assignments.Where(x => x.GroupId == groupId);
            return await res.ToListAsync();
        }
    }
}