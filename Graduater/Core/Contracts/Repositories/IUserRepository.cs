using Core.Contracts.Entities;
using Core.Entities.Database;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Core.Contracts.Repositories
{
    // Repository to handle all database operations for the User entity
    public interface IUserRepository
    {
        // Get all users
        IAsyncEnumerable<IUser> GetAllUsersAsync();
        // Get user by id
        Task<IUser?> GetUserByIdAsync(int id);
        // Get user by username
        Task<IUser?> GetUserByUsernameWithSessionsAsync(string username);
        // Get user by email
        Task<IUser?> GetUserByEmailWithSessionsAsync(string email);

        Task<IUser?> GetUserByUsernameAsync(string username);
        // Get user by email
        Task<IUser?> GetUserByEmailAsync(string email);

        // Get user by email verification token
        Task<IUser?> GetUserByEmailVerificationTokenAsync(string token);
        // Get user by password reset token
        Task<IUser?> GetUserByPasswordResetTokenAsync(string token);

        Task CreateUserAsync(User user);
        Task<bool> DeleteUserAsync(int id);
    }
}