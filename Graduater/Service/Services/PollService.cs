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

        public async Task<List<Poll>> GetAllAsync()
        {
            return await _unitOfWork.GenericRepository.Query<Poll>().ToListAsync();
        }

        public async Task<int> IfIHaveVotedAsync(int pollId, int userId)
        { 
            Poll? poll = await _unitOfWork.GenericRepository.GetAsync<Poll>(pollId);

            if (poll == null)
            {
                throw new Exception("Poll not found");
            }

            PollOption? pollOption = await _unitOfWork.GenericRepository.Query<PollOption>().Where(x => x.PollId == pollId).FirstOrDefaultAsync();

            if (pollOption == null)
            {
                throw new Exception("Poll option not found");
            }

            PollVote? pollVote = await _unitOfWork.GenericRepository.Query<PollVote>().Where(x => x.PollOptionId == pollOption.Id && x.UserId == userId).FirstOrDefaultAsync();

            if (pollVote == null)
            {
                return -1;
            }

            return pollVote.PollOptionId;
        }

        public async Task<Poll> ReadAsync(int id)
        {
            Poll? poll = await _unitOfWork.GenericRepository.GetAsync<Poll>(id);

            if (poll == null)
            {
                throw new Exception("Poll not found");
            }
            List<PollOption> options = await _unitOfWork.GenericRepository.Query<PollOption>().Where(x => x.PollId == id).ToListAsync();
            
            // fetch vote scores
            foreach (PollOption option in options)
            {
                option.Votes = await _unitOfWork.GenericRepository.Query<PollVote>().Where(x => x.PollOptionId == option.Id).CountAsync();
            }
            
            poll.PollOptions = options;

            return poll;
        }

        public async Task UpdateAsync(Poll model)
        {
            await _unitOfWork.GenericRepository.UpdateAsync(model);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task<int> VoteAsync(int pollOptionId, int userId)
        {
            PollOption? pollOption = await _unitOfWork.GenericRepository.GetAsync<PollOption>(pollOptionId);

            if (pollOption == null)
            {
                throw new Exception("Poll option not found");
            }

            Poll? poll = await _unitOfWork.GenericRepository.GetAsync<Poll>(pollOption.PollId);

            if (poll == null)
            {
                throw new Exception("Poll not found");
            }

            PollVote? pollVote = await _unitOfWork.GenericRepository.Query<PollVote>().Where(x => x.PollOptionId == pollOptionId && x.UserId == userId).FirstOrDefaultAsync();

            if (pollVote != null)
            {
                throw new Exception("User has already voted");
            }

            pollVote = new PollVote
            {
                PollOptionId = pollOptionId,
                UserId = userId
            };

            await _unitOfWork.GenericRepository.AddAsync(pollVote);
            await _unitOfWork.SaveChangesAsync();

            return pollOptionId;
        }
    }
}
