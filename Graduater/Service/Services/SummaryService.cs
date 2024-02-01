using Core.Contracts;
using Core.Contracts.Models;
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
    public class SummaryService : ISummaryService
    {
        private readonly IUnitOfWork _unitOfWork;

        public SummaryService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<int> CreateAsync(CreateSummaryRequest model)
        {
            Summary summary = new();
            summary.Content = model.Content;
            summary.Title = model.Title;
            summary.Description = model.Description;
            summary.SubjectId = model.SubjectId;

            await _unitOfWork.GenericRepository.AddAsync(summary);
            await _unitOfWork.SaveChangesAsync();
            return summary.Id;
        }

        public async Task DeleteAsync(int id)
        {
            await _unitOfWork.GenericRepository.DeleteAsync<Summary>(id);
            await _unitOfWork.SaveChangesAsync();
        }

        public List<Summary>? GetBySubject(int id)
        {
            return _unitOfWork.GenericRepository.Query<Summary>().Where(x => x.SubjectId == id).ToList();
        }

        public async Task<Summary> ReadAsync(int id)
        {
            Summary? summary = await _unitOfWork.GenericRepository.GetAsync<Summary>(id);

            if (summary == null)
            {
                throw new Exception("Summary not found");
            }

            summary.Votes = await CalculateVotesOnSummaryAsync(id);

            return summary;
        }

        public async Task UpdateAsync(Summary model)
        {
            await _unitOfWork.GenericRepository.UpdateAsync(model);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task VoteAsync(int summaryId, int userId, int value)
        {
            // check if user has already voted

            SummaryVote? userVote = await _unitOfWork.GenericRepository.Query<SummaryVote>().Where(x => x.SummaryId == summaryId && x.UserId == userId).FirstOrDefaultAsync();

            if (userVote != null)
            {
                userVote.Value = value;
                await _unitOfWork.GenericRepository.UpdateAsync(userVote);
            }
            else
            {
                SummaryVote vote = new();
                vote.SummaryId = summaryId;
                vote.UserId = userId;
                vote.Value = value;

                await _unitOfWork.GenericRepository.AddAsync(vote);
            }

            await _unitOfWork.SaveChangesAsync();
        }

        public async Task<int> CalculateVotesOnSummaryAsync(int summaryId)
        {
            List<SummaryVote> votes = await _unitOfWork.GenericRepository.Query<SummaryVote>().Where(x => x.SummaryId == summaryId).ToListAsync();

            int sum = 0;
            foreach (var vote in votes)
            {
                sum += vote.Value;
            }

            return sum;
        }

        public async Task<int> IfIHaveVotedAsync(int summaryId, int userId)
        {
            SummaryVote? userVote = await _unitOfWork.GenericRepository.Query<SummaryVote>().Where(x => x.SummaryId == summaryId && x.UserId == userId).FirstOrDefaultAsync();

            if (userVote == null)
            {
                return 0;
            }
            else
            {
                return userVote!.Value;
            }
        }
    }
}
