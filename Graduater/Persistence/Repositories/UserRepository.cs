using Core.Contracts;
using Core.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly ApiConfig _config;

        public UserRepository(ApplicationDbContext context, ApiConfig config)
        {
            _context = context;
            _config = config;
        }

        public Task<ValidationResult> CreateUserAsync(User user)
        {
            throw new NotImplementedException();
        }

        public Task<ValidationResult> DeleteUserAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<User>> GetAllUsersAsync()
        {
            throw new NotImplementedException();
        }

        public Task<User?> GetByIdAsync(long? userId)
        {
            throw new NotImplementedException();
        }

        public Task<User?> GetUserByEmailAsync(string email)
        {
            throw new NotImplementedException();
        }

        public Task<User?> GetUserByEmailVerificationTokenAsync(string token)
        {
            throw new NotImplementedException();
        }

        public Task<User?> GetUserByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<User?> GetUserByPasswordResetTokenAsync(string token)
        {
            throw new NotImplementedException();
        }

        public Task<User?> GetUserByUsernameAsync(string username)
        {
            throw new NotImplementedException();
        }

        public Task<(string accessToken, string refreshToken)?> LoginAsync(int userId)
        {
            throw new NotImplementedException();
        }

        public Task<string?> RegenerateRefreshToken(long userId, string sessionId)
        {
            throw new NotImplementedException();
        }

        public Task<ValidationResult> UpdateUserAsync(User user)
        {
            throw new NotImplementedException();
        }

        public Task<string?> ValidateRefreshTokenSessionAsync(long userId, string sessionId)
        {
            throw new NotImplementedException();
        }
    }
}
