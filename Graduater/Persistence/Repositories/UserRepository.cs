using Core.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Persistence;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Reflection.Metadata.Ecma335;
using Microsoft.EntityFrameworkCore;
using Core.Contracts.Repositories;
using Core.Contracts.Entities;

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
            User? user = (User?) await GetUserByIdAsync(id);
            if (user == null) return false;
            _context.Users.Remove(user);
            return true;
        }

        public IAsyncEnumerable<IUser> GetAllUsersAsync()
        {
            return _context.Users.AsAsyncEnumerable();
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

        public async Task<IUser?> GetUserByPasswordResetTokenAsync(string token)
        {
            var users = _context.Users.Where(x => x.PasswordResetToken == token);
            return await users.SingleOrDefaultAsync();
        }

        public async Task<IUser?> GetUserByUsernameAsync(string username)
        {
            var users = _context.Users.Where(x => x.Username == username);
            return await users.SingleOrDefaultAsync();
        }

        public async Task<bool> ValidateRefreshTokenSessionAsync(int userId, string sessionId)
        {
            var user = await GetUserByIdAsync(userId);
            if (user == null) return false;
            var userSessions = user.UserSessions.Where(x => x.SessionKey == sessionId);
            if (!userSessions.Any()) return false;
            var userSession = userSessions.First(); 
            if (userSession == null) return false;
            if (userSession.Expires <= DateTime.UtcNow) return false;
            return true;
        }
    }
}
