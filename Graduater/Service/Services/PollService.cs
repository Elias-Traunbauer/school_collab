using Core.Contracts;
using Core.Contracts.Services;
using Core.Entities.Database;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services
{
    public class PollService : IPollService
    {
        private readonly IUnitOfWork _unitOfWork;

        public PollService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<int> CreateAsync(PollCreatePayload model)
        {
            Poll poll = model.Convert();

            await _unitOfWork.GenericRepository.AddAsync(poll);
            await _unitOfWork.SaveChangesAsync();
            return poll.Id;
        }

        public async Task<int> CreateAsync(PollCreatePayload model, int userId)
        {
            Poll poll = model.Convert();
            poll.CreatorUserId = userId;

            await _unitOfWork.GenericRepository.AddAsync(poll);
            await _unitOfWork.SaveChangesAsync();
            return poll.Id;
        }

        public async Task DeleteAsync(int id)
        {
            await _unitOfWork.GenericRepository.DeleteAsync<Poll>(id);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task<Poll> ReadAsync(int id)
        {
            Poll? poll = await _unitOfWork.GenericRepository.GetAsync<Poll>(id);

            if (poll == null)
            {
                throw new Exception("Poll not found");
            }
            List<PollOption> options = await _unitOfWork.GenericRepository.Query<PollOption>().Where(x => x.PollId == id).ToListAsync();
            poll.PollOptions = options;

            return poll;
        }

        public async Task UpdateAsync(Poll model)
        {
            await _unitOfWork.GenericRepository.UpdateAsync(model);
            await _unitOfWork.SaveChangesAsync();
        }
    }
}
