using Core.Contracts;
using Core.Contracts.Models;
using Core.Contracts.Services;
using Core.Entities.Database;
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

            return summary;
        }

        public async Task UpdateAsync(Summary model)
        {
            await _unitOfWork.GenericRepository.UpdateAsync(model);
            await _unitOfWork.SaveChangesAsync();
        }
    }
}
