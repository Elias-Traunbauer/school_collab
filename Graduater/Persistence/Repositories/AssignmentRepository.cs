using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Persistence;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Reflection.Metadata.Ecma335;
using Microsoft.EntityFrameworkCore;
using Core.Contracts.Repositories;
using Core.Contracts.Entities;
using Core.Entities.Database;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore.Query;

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
            Assignment? assignment = (Assignment?) await GetAssignmentByIdAsync(id);
            if (assignment == null) return false;
            _context.Assignments.Remove(assignment);
            return true;
        }

        public async Task<IEnumerable<IAssignment>> GetAllAssignmentsAsync(params Expression<Func<IAssignment, object?>>[] includes)
        {
            return await _context.Assignments.ToListAsync();
        }

        public async Task<IAssignment?> GetAssignmentByIdAsync(int id, params Expression<Func<IAssignment, object?>>[] includes)
        {
            var assignments = _context.Assignments.Where(x => x.Id == id);
            if (includes != null)
            {
                foreach (var include in includes)
                {
                    assignments = (IQueryable<Assignment>)assignments.Include(include).AsQueryable();
                }
            }
            return await assignments.SingleOrDefaultAsync();
        }
    }
}
