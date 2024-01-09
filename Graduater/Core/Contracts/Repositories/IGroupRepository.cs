using Core.Contracts.Entities;
using Core.Entities.Database;

namespace Core.Contracts.Repositories
{
    // group methods
    public interface IGroupRepository
    {

        Task<IGroup?> GetAsync(int id);
        Task<IEnumerable<IGroup>> GetAllAsync();
        Task<IEnumerable<IGroup>> GetAllForUserAsync(int userId);
        Task JoinGroup(int userId, int groupId);
        Task LeaveGroup(int userId, int groupId);

        Task CreateAsync(Group group);
        Task UpdateAsync(Group group);
        Task<bool> DeleteAsync(int id);
    }
}