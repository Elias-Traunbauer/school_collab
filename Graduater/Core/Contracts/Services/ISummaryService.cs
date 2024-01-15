using Core.Contracts.Models;
using Core.Entities.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Contracts.Services
{
    public interface ISummaryService : IEZCRUDService<CreateSummaryRequest, Summary, int>
    {
        List<Summary>? GetBySubject(int id);
    }
}
