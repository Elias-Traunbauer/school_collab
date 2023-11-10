using Core.Contracts.Entities;
using Core.Contracts.Models;
using Core.Entities.Database;
using Core.Entities.Models;

namespace Core.Contracts.Services
{
    public interface IUserService
    {
        Task<IServiceResult<User?>> GetUser(int id);

        Task<ILoginResult> LoginAsync(UserLoginPayload loginInformation);

        Task<IServiceResult> RegisterAsync(UserRegisterPayload userRegisterPayload);

        Task<IServiceResult> VerifyEmailAsync(string token);

        Task<IServiceResult> ForgotPasswordAsync(string email);

        Task<IServiceResult> ResetPasswordAsync(UserPasswordResetPayload userPasswordResetPayload);

        Task<IServiceResult<string>> UseRefreshTokenAsync(int userId, string token);

        Task<IServiceResult<bool>> IsUsernameTaken(string username);

        Task<IServiceResult<bool>> IsEmailTaken(string email);

        Task<IServiceResult<ICollection<IUser>>> SearchUser(string username);

        Task<IServiceResult> EnableTwoFactorAuthentication(int userId);

        Task<IServiceResult> DisableTwoFactorAuthentication(int userId);
        Task<IServiceResult> ChangePasswordAsync(int id, string oldPassword, string newPassword);
        Task<IServiceResult> TwoFactorAuthenticateSession(int id);
        Task<IServiceResult<User>> GetUserWithSessions(int id);
    }
}