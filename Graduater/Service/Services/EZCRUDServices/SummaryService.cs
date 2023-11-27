using Core.Contracts;
using Core.Contracts.Repositories;
using Core.Entities.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services.EZCRUDServices
{
    internal class SummaryService : IEZCRUDService<CreateSummaryRequest, Summary, int>
    {
        private readonly IUnitOfWork _unitOfWork;

        public SummaryService(IUnitOfWork unitOfWork) 
        {
            _unitOfWork = unitOfWork;
        }

        public Task<int> CreateAsync(CreateSummaryRequest model)
        {
            throw new NotImplementedException();
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

    public class CreateSummaryRequest
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
    }
}
