using Core.Contracts.Entities;
using Core.Contracts.Models;
using Core.Contracts.Repositories;
using Core.Entities.Database;
using Core.Entities.Models;
using Microsoft.EntityFrameworkCore;

namespace Persistence.Repositories
{
    public class SubjectRepository : ISubjectRepository
    {
        private readonly ApplicationDbContext _context;

        public SubjectRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task CreateSubjectAsync(Subject subject)
        {

            await _context.Subjects.AddAsync(subject);

        }

        public async Task DeleteSubjectByIdAsync(int id)
        {

            _context.Subjects.Remove((Subject)await GetByIdAsync(id));
        }

        public async Task<ISubject> GetByIdAsync(int id)
        {
            return await _context.Subjects.FindAsync(id);
        }

        public async Task<IServiceResult<ICollection<ISubject>>> SearchSubjectsAsync(string name)
        {
            name = name.ToLower();
            return new ServiceResult<ICollection<ISubject>>(await _context.Subjects.Where(s => s.Name.ToLower().Contains(name) || s.ShortName.ToLower().Contains(name)).Cast<ISubject>().ToListAsync());
        }
    }
}