using Core.Contracts.Models;
using Core.Entities.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Contracts.Services
{
    public interface IPollService : IEZCRUDService<PollCreatePayload, Poll, int>
    {
        public Task<int> CreateAsync(PollCreatePayload model, int userId);
        Task<List<Poll>> GetAllAsync();
        Task<int> VoteAsync(int pollOptionId, int userId);
    }
}
