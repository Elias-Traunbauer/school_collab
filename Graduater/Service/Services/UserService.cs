using Core.Contracts;
using Core.Contracts.Entities;
using Core.Contracts.Models;
using Core.Contracts.Services;
using Core.Entities.Database;
using Core.Entities.Models;
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
        private readonly IPasswordService _passwordService;
        private readonly IRandomKeyService _randomKeyService;

        public UserService(IUnitOfWork uow, IJsonWebTokenService jsonWebTokenService, IPasswordService passwordService, IRandomKeyService randomKeyService)
        {
            _unitOfWork = uow;
            _jsonWebTokenService = jsonWebTokenService;
            _passwordService = passwordService;
            _randomKeyService = randomKeyService;
        }

        /// <summary>
        /// Only returns ServiceResult.Completed for privacy and security reasons
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        public async Task<IServiceResult> ForgotPasswordAsync(string email)
        {
            IUser? user = await _unitOfWork.UserRepository.GetUserByEmailAsync(email);
            if (user == null)
            {
                return ServiceResult.Completed;
            }
            string passwordResetToken = _randomKeyService.GetRandomKey(128);
            user.PasswordResetToken = passwordResetToken;
            user.PasswordResetTokenExpiration = DateTime.UtcNow.AddMinutes(5);
            await _unitOfWork.SaveChangesAsync();
            // send email

            return ServiceResult.Completed;
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
            string hashedInputPassword = _passwordService.HashPassword(loginInformation.Password, user.PasswordSalt);
            if (hashedInputPassword != user.PasswordHash)
            {
                return GetLoginErrorResult();
            }
            string sessionKey = _randomKeyService.GetRandomKey(128);
            user.UserSessions.Add(new UserSession()
            {
                SessionKey = sessionKey,
                IssuedAt = DateTime.UtcNow,
                Expires = DateTime.UtcNow.AddDays(30),
                LastAction = DateTime.UtcNow,
                Ip = "Not yet implemented"
            });

            string accessToken = _jsonWebTokenService.GenerateAccessToken(user);
            string refreshToken = _jsonWebTokenService.GenerateRefreshToken(user, sessionKey);

            await _unitOfWork.SaveChangesAsync();
            return new LoginResult()
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken,
                ServiceResult = ServiceResult.Completed
            };
        }

        public async Task<IServiceResult> RegisterAsync(UserRegisterPayload userRegisterPayload)
        {
            if (userRegisterPayload.Password != userRegisterPayload.RepeatedPassword)
            {
                return new ServiceResult(nameof(userRegisterPayload.RepeatedPassword), "Passwords do not match");
            }
            if ((await _unitOfWork.UserRepository.GetUserByUsernameAsync(userRegisterPayload.Username)) != null)
            {
                return new ServiceResult(nameof(userRegisterPayload.Username), "Username already taken");
            }
            if ((await _unitOfWork.UserRepository.GetUserByEmailAsync(userRegisterPayload.Email)) != null)
            {
                return new ServiceResult(nameof(userRegisterPayload.Email), "Email is already registered");
            }
            string passwordSalt = _randomKeyService.GetRandomKey(128);
            string emailVerificationToken = _randomKeyService.GetRandomKey(128);
            var user = new User()
            {
                Username = userRegisterPayload.Username,
                FirstName = userRegisterPayload.Firstname,
                LastName = userRegisterPayload.Lastname,
                Email = userRegisterPayload.Email,
                PasswordSalt = passwordSalt,
                PasswordHash = _passwordService.HashPassword(userRegisterPayload.Password, passwordSalt),
                EmailVerificationToken = emailVerificationToken,
                EmailVerificationTokenExpiration = DateTime.UtcNow.Add(TimeSpan.FromMinutes(5))
            };
            await _unitOfWork.UserRepository.CreateUserAsync(user);
            await _unitOfWork.SaveChangesAsync();
            // send email


            return ServiceResult.Completed;
        }

        public async Task<IServiceResult> ResetPasswordAsync(UserPasswordResetPayload userPasswordResetPayload)
        {
            IUser? user = await _unitOfWork.UserRepository.GetUserByPasswordResetTokenAsync(userPasswordResetPayload.Token);
            if (user == null)
            {
                return new ServiceResult(nameof(userPasswordResetPayload.Token), "Token not found");
            }
            if (user.PasswordResetTokenExpiration <= DateTime.UtcNow)
            {
                user.PasswordResetToken = null;
                user.PasswordResetTokenExpiration = null;
                return new ServiceResult(nameof(userPasswordResetPayload.Token), "Token expired");
            }
            if (userPasswordResetPayload.Password != userPasswordResetPayload.RepeatPassword)
            {
                return new ServiceResult(nameof(userPasswordResetPayload.RepeatPassword), "Passwords do not match");
            }
            string hashedPassword = _passwordService.HashPassword(userPasswordResetPayload.Password, user.PasswordSalt);
            user.PasswordHash = hashedPassword;
            await _unitOfWork.SaveChangesAsync();
            return ServiceResult.Completed;
        }

        public async Task<IServiceResult> VerifyEmailAsync(string token)
        {
            IUser? user = await _unitOfWork.UserRepository.GetUserByEmailVerificationTokenAsync(token);
            if (user == null)
            {
                return new ServiceResult(nameof(token), "Token not found");
            }
            user.Permissions = UserPermission.Default;
            user.EmailVerificationToken = null;
            user.EmailVerificationTokenExpiration = null;
            user.IsEmailVerified = true;
            await _unitOfWork.SaveChangesAsync();
            return ServiceResult.Completed;
        }

        private static LoginResult GetLoginErrorResult()
        {
            UserLoginPayload dummy = new();
            return new LoginResult()
            {
                ServiceResult = new ServiceResult()
                {
                    Status = 401,
                    Errors = new Dictionary<string, List<string>>()
                    {
                        { nameof(dummy.Identifier), new List<string>() { "Wrong username or password" } },
                        { nameof(dummy.Password), new List<string>() { "Wrong username or password" } }
                    }
                }
            };
        }

        public async Task<ILoginResult> UseRefreshTokenAsync(int userId, string token)
        {
            var user = await _unitOfWork.UserRepository.GetUserByIdAsync(userId);

            if (user == null)
            {
                return new LoginResult()
                {
                    ServiceResult = new ServiceResult("Error", "User not found")
                };
            }
            var session = user.UserSessions.SingleOrDefault(x => x.SessionKey == token, null);
            if (session == null)
            {
                return new LoginResult()
                {
                    ServiceResult = new ServiceResult("Error", "Session not found")
                };
            }
            session.LastAction = DateTime.UtcNow;
            string accessToken = _jsonWebTokenService.GenerateAccessToken((user as User)!);
            await _unitOfWork.SaveChangesAsync();
            return new LoginResult()
            {
                ServiceResult = ServiceResult.Completed,
                AccessToken = accessToken,
                RefreshToken = null!
            };
        }
    }
}
