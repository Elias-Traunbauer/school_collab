using Core.Contracts.Repositories;
using Core.Entities.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Repositories
{
    public class SummaryRepository : ISummaryRepository
    {
        private readonly ApplicationDbContext _context;

        public SummaryRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<int> CreateAsync(Summary model)
        {
            if (model == null) throw new ArgumentNullException(nameof(model));
            await _context.Summaries.AddAsync(model);
            return model.Id;
        }

        public Task DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<Summary> ReadAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task UpdateAsync(Summary model)
        {
            throw new NotImplementedException();
        }
    }
}
