using Core.Contracts;
using Core.Contracts.Entities;
using Core.Contracts.Models;
using Core.Contracts.Services;
using Core.Entities.Database;
using Core.Entities.Models;
using Service.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services
{
    public class UserService : IUserService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IJsonWebTokenService _jsonWebTokenService;

        public UserService(IUnitOfWork uow, IJsonWebTokenService jsonWebTokenService)
        {
            _unitOfWork = uow;
            _jsonWebTokenService = jsonWebTokenService;
        }

        public async Task<IServiceResult> ForgotPasswordAsync(string email)
        {
            throw new NotImplementedException();
        }

        public async Task<ILoginResult> LoginAsync(UserLoginPayload loginInformation)
        {
            Func<string, Task<IUser?>>[] userSearchMethods = new Func<string, Task<IUser?>>[2]
            {
                _unitOfWork.UserRepository.GetUserByUsernameAsync,
                _unitOfWork.UserRepository.GetUserByEmailAsync
            };

            User? user = null;
            foreach (var searchMethod in userSearchMethods)
            {
                user = (User?) await searchMethod(loginInformation.Identifier);

                if (user != null)
                {
                    break;
                }
            }
            if (user == null)
            {
                return GetLoginErrorResult();
            }
            string hashedInputPassword = PasswordHelper.HashPassword(loginInformation.Password, user.PasswordSalt);
            if (hashedInputPassword != user.PasswordHash)
            {
                return GetLoginErrorResult();
            }

            string accessToken = _jsonWebTokenService.GenerateAccessToken(user);
            string refreshToken = _jsonWebTokenService.GenerateRefreshToken(user, Utils.RandomCharSequence());

            return new LoginResult()
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken,
                ServiceResult = ServiceResult.Completed
            };
        }

        public async Task<IRegisterResult> RegisterAsync(UserRegisterPayload userRegisterPayload)
        {
            throw new NotImplementedException();
        }

        public async Task<IServiceResult> ResetPasswordAsync(UserPasswordResetPayload userPasswordResetPayload)
        {
            throw new NotImplementedException();
        }

        public async Task<IServiceResult> VerifyEmailAsync(string token)
        {
            throw new NotImplementedException();
        }

        private LoginResult GetLoginErrorResult()
        {
            UserLoginPayload dummy = new();
            return new LoginResult()
            {
                ServiceResult = new ServiceResult()
                {
                    Status = 400,
                    Errors = new Dictionary<string, List<string>>()
                    {
                        { nameof(dummy.Identifier), new List<string>() { "Wrong username or password" } },
                        { nameof(dummy.Password), new List<string>() { "Wrong username or password" } }
                    }
                }
            };
        }
    }
}
