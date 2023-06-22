using Core.Contracts.Entities;
using Core.Contracts.Repositories;
using Core.Entities.Database;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Repositories
{
    public class GroupRepository : IGroupRepository
    {
        private readonly ApplicationDbContext _context;

        public GroupRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task CreateAsync(Group group)
        {
            await _context.Groups.AddAsync(group);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            _context.Groups.Remove(_context.Groups.Find(id));
            return true;
        }

        public async Task<IEnumerable<IGroup>> GetAllAsync()
        {
            // get all groups
            return _context.Groups.AsEnumerable();
        }

        public async Task<IEnumerable<IGroup>> GetAllForUserAsync(int userId)
        {
            // get all groups where user is a member
            return _context.Groups.Where(x => x.GroupUsers!.Any(x => x.UserId == userId)).AsEnumerable();
        }

        public async Task<IGroup?> GetAsync(int id)
        {
            return await _context.Groups.FindAsync(id);
        }

        public async Task JoinGroup(int userId, int groupId)
        {
            await _context.GroupUsers.AddAsync(new GroupUser { UserId = userId, GroupId = groupId });
        }

        public async Task LeaveGroup(int userId, int groupId)
        {
            _context.GroupUsers.Remove(_context.GroupUsers.Where(x => x.UserId == userId && x.GroupId == groupId).FirstOrDefault());
        }

        public Task UpdateAsync(Group group)
        {
            // update group

            _context.Update(group);
            return Task.CompletedTask;
        }
    }
}
