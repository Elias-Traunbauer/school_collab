using Core.Contracts.Models;
using Core.Entities.Models;

namespace Core.Contracts.Services
{
    public interface IUserService
    {
        Task<ILoginResult> LoginAsync(UserLoginPayload loginInformation);

        Task<IServiceResult> RegisterAsync(UserRegisterPayload userRegisterPayload);

        Task<IServiceResult> VerifyEmailAsync(string token);

        Task<IServiceResult> ForgotPasswordAsync(string email);

        Task<IServiceResult> ResetPasswordAsync(UserPasswordResetPayload userPasswordResetPayload);

        Task<IServiceResult<string>> UseRefreshTokenAsync(int userId, string token);

        Task<IServiceResult<bool>> IsUsernameTaken(string username);

        Task<IServiceResult<bool>> IsEmailTaken(string email);
    }
}
