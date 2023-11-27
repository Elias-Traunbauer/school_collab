using Core.Entities.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Contracts.Repositories
{
    public interface ISummaryRepository
    {
        Task<int> CreateAsync(Summary summary);
        Task DeleteAsync(int id);
        Task<Summary> ReadAsync(int id);
        Task UpdateAsync(Summary model);
    }
}
