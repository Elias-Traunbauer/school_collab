using Core.Contracts.Models;
using Core.Entities.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
    }
}
