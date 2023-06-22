using Core.Contracts.Entities;
using Core.Contracts.Models;
using Core.Contracts.Repositories;
using Core.Entities.Database;
using Core.Entities.Models;
using Microsoft.EntityFrameworkCore;

namespace Persistence.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;

        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task CreateUserAsync(User user)
        {
            if (user == null) throw new ArgumentNullException(nameof(user));
            await _context.Users.AddAsync(user);
        }

        public async Task<bool> DeleteUserAsync(int id)
        {
            User? user = (User?)await GetUserByIdAsync(id);
            if (user == null) return false;
            _context.Users.Remove(user);
            return true;
        }

        public IAsyncEnumerable<IUser> GetAllUsersAsync()
        {
            return _context.Users.AsAsyncEnumerable();
        }

        public async Task<IUser?> GetUserByEmailWithSessionsAsync(string email)
        {
            var users = _context.Users.Where(x => x.Email == email).Include(x => x.Sessions);

            return await users.SingleOrDefaultAsync();
        }

        public async Task<IUser?> GetUserByEmailAsync(string email)
        {
            var users = _context.Users.Where(x => x.Email == email);

            return await users.SingleOrDefaultAsync();
        }

        public async Task<IUser?> GetUserByEmailVerificationTokenAsync(string token)
        {
            var users = _context.Users.Where(x => x.EmailVerificationToken == token);
            return await users.SingleOrDefaultAsync();
        }

        public async Task<IUser?> GetUserByIdAsync(int id)
        {
            var users = _context.Users.Where(x => x.Id == id);
            return await users.SingleOrDefaultAsync();
        }

        public async Task<IUser?> GetUserByIdWithSessionsAsync(int id)
        {
            var users = _context.Users.Where(x => x.Id == id).Include(x => x.Sessions);
            return await users.SingleOrDefaultAsync();
        }

        public async Task<IUser?> GetUserByPasswordResetTokenAsync(string token)
        {
            var users = _context.Users.Where(x => x.PasswordResetToken == token);
            return await users.SingleOrDefaultAsync();
        }

        public async Task<IUser?> GetUserByUsernameWithSessionsAsync(string username)
        {
            var users = _context.Users.Where(x => x.Username == username).Include(x => x.Sessions);
            return await users.SingleOrDefaultAsync();
        }

        public async Task<IUser?> GetUserByUsernameAsync(string username)
        {
            var users = _context.Users.Where(x => x.Username == username);
            return await users.SingleOrDefaultAsync();
        }

        public async Task<ICollection<IUser>> SearchUserAsync(string username)
        {
            return await _context.Users.Where(s => s.Username.ToLower().Contains(username.ToLower())).Cast<IUser>().ToListAsync();
        }
    }
}