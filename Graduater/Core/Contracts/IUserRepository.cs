using Core.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Contracts
{
    // Repository to handle all database operations for the User entity
    public interface IUserRepository
    {
        // Get all users
        Task<IEnumerable<User>> GetAllUsersAsync();
        // Get user by id
        Task<User?> GetUserByIdAsync(int id);
        // Get user by username
        Task<User?> GetUserByUsernameAsync(string username);
        // Get user by email
        Task<User?> GetUserByEmailAsync(string email);
        // Get user by email verification token
        Task<User?> GetUserByEmailVerificationTokenAsync(string token);
        // Get user by password reset token
        Task<User?> GetUserByPasswordResetTokenAsync(string token);

        Task<(string accessToken, string refreshToken)?> LoginAsync(int userId);

        Task<ValidationResult> CreateUserAsync(User user);
        Task<ValidationResult> UpdateUserAsync(User user);
        Task<ValidationResult> DeleteUserAsync(int id);
        Task<User?> GetByIdAsync(long? userId);
        Task<string?> ValidateRefreshTokenSessionAsync(long userId, string sessionId);
        Task<string?> RegenerateRefreshToken(long userId, string sessionId);
    }
}