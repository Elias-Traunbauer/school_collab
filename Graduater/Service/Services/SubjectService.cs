using Core.Contracts;
using Core.Contracts.Entities;
using Core.Contracts.Models;
using Core.Contracts.Services;
using Core.Entities.Database;
using Core.Entities.Models;
using Persistence;
using System.Data.Entity;
using System.Net.WebSockets;

namespace Service.Services
{
    public class SubjectService : ISubjectService
    {
        private readonly ApiConfig _config;
        private readonly IUnitOfWork _unitOfWork;

        public SubjectService(IUnitOfWork uow, ApiConfig apiConfig)
        {
            _config = apiConfig;
            _unitOfWork = uow;
        }

        public async Task<IServiceResult<int>> CreateSubjectAsync(Subject subject)
        {
            await _unitOfWork.SubjectRepository.CreateSubjectAsync(subject);
            await _unitOfWork.SaveChangesAsync();
            return new ServiceResult<int>(subject.Id);
        }

        public async Task<IServiceResult> DeleteSubjectAsync(int id)
        {
            await _unitOfWork.SubjectRepository.DeleteSubjectByIdAsync(id);
            await _unitOfWork.SaveChangesAsync();
            return new ServiceResult<bool>(true);
        }

        public async Task<IServiceResult<List<Subject>>> GetAllSubjectsAsync()
        {
            return new ServiceResult<List<Subject>>(_unitOfWork.GenericRepository.Query<Subject>().ToList());
        }

        public async Task<IServiceResult<ISubject>> GetSubjectAsync(int id)
        {
            return new ServiceResult<ISubject>(await _unitOfWork.SubjectRepository.GetByIdAsync(id));
        }

        public async Task<IServiceResult<ICollection<ISubject>>> SearchSubjectsAsync(string name)
        {
            return await _unitOfWork.SubjectRepository.SearchSubjectsAsync(name);
        }
    }
}