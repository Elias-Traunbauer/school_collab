using Core.Contracts;
using Core.Contracts.Entities;
using Core.Contracts.Models;
using Core.Contracts.Services;
using Core.Entities.Database;
using Core.Entities.Models;
using Persistence;
using System.Net.WebSockets;

namespace Service.Services
{
    public class GroupService : IGroupService
    {
        private readonly ApiConfig _config;
        private readonly IUnitOfWork _unitOfWork;

        public GroupService(IUnitOfWork uow, ApiConfig apiConfig)
        {
            _config = apiConfig;
            _unitOfWork = uow;
        }

        public async Task<IServiceResult> DeleteGroupAsync(int id)
        {
            var res = await _unitOfWork.GroupRepository.DeleteAsync(id);

            if (!res)
            {
                return new ServiceResult("Id", "Group not found");
            }
            await _unitOfWork.SaveChangesAsync();
            return new ServiceResult();
        }

        public async Task<IServiceResult<IGroup>> GetGroupAsync(int id)
        {
            var file = await _unitOfWork.GroupRepository.GetAsync(id);
            if (file == null)
            {
                return new ServiceResult<IGroup>("Id", "Group not found");
            }
            return new ServiceResult<IGroup>(file);
        }

        public async Task<IServiceResult<int>> CreateGroupAsync(Group group)
        {
            await _unitOfWork.GroupRepository.CreateAsync(group);

            await _unitOfWork.SaveChangesAsync();

            return new ServiceResult<int>(group.Id);
        }

        public async Task<IServiceResult<ICollection<IGroup>>> GetGroupsForUserAsync(int userId)
        {
            var groups = await _unitOfWork.GroupRepository.GetAllForUserAsync(userId);
            return new ServiceResult<ICollection<IGroup>>(groups.ToList());
        }
    }
}