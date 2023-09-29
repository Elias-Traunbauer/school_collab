using Core.Contracts.Entities;
using Core.Contracts.Models;
using Core.Entities.Database;

namespace Core.Contracts.Services
{
    public interface IGroupService
    {
        Task<IServiceResult<ICollection<IGroup>>> GetGroupsForUserAsync(int userId);

        Task<IServiceResult<IGroup>> GetGroupAsync(int id);

        Task<IServiceResult<int>> CreateGroupAsync(Group group);

        Task<IServiceResult> DeleteGroupAsync(int id);
    }
}