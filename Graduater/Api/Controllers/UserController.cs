using Api.Attributes;
using Api.DataTransferObjects;
using Api.Helpers;
using Core.Contracts.Models;
using Core.Contracts.Services;
using Core.Entities.Database;
using Core.Entities.Models;
using Google.Authenticator;
using Microsoft.AspNetCore.Mvc;
using Persistence;
using Service.Services;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class UserController : Controller
    {
        private readonly ApiConfig _config;

        public UserController(ApiConfig configuration)
        {
            _config = configuration;
        }

        [HttpPost("login")]
        [NoAuthenticationRequired]
        [RateLimit(maxRequestsPerMinute: 5, rateLimitMode: RateLimitMode.SlidingTimeWindow)]
        public async Task<IActionResult> Login([FromBody] UserLoginPayload loginInformation, [FromServices] IUserService userService)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            ILoginResult result = await userService.LoginAsync(loginInformation);

            if (result.ServiceResult.Status != 200)
            {
                return Ok(result.ServiceResult);
            }

            HttpContext.Response.SetCookie(_config.AccessTokenCookieIdentifier, result.AccessToken!, DateTime.UtcNow.Add(_config.AccessTokenLifetime));
            HttpContext.Response.SetCookie(_config.RefreshTokenCookieIdentifier, result.RefreshToken!, DateTime.UtcNow.Add(_config.RefreshTokenLifetime));
            return Ok(new
            {
                Status = 200,
                result.TwoFactorAuthenticationEnabled
            });
        }

        [HttpGet("{id}")]
        [EndpointPermission(UserPermission.View)]
        [RateLimit(maxRequestsPerMinute: 20, rateLimitMode: RateLimitMode.SlidingTimeWindow)]
        public async Task<IActionResult> GetUser([FromRoute] int id, [FromServices] IUserService userService)
        {
            var user = (await userService.GetUserByIdAsync(id)).Value;
            if (user == null)
            {
                return Ok(
                    new
                    {
                        Status = 404
                    });
            }
            return Ok(
                        (UserDTO) user!
                   );
        }

        [HttpGet("search/{query}")]
        public async Task<IActionResult> SearchUser([FromRoute] string query, [FromServices] IUserService userService)
        {
            var users = (await userService.SearchUser(query)).Value;

            return Ok(
                      users!.Select(x => (UserDTO)(User)x)
                   );
        }

        [HttpPut]
        [RateLimitAttribute(maxRequestsPerMinute: 5, rateLimitMode: RateLimitMode.SlidingTimeWindow)]
        public async Task<IActionResult> UpdateUser([FromBody] User updateInfo, [FromServices] IUserService userService)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //ILoginResult result = await userService.LoginAsync(loginInformation);

            //if (result.ServiceResult.Status != 200)
            //{
            //    return Ok(result.ServiceResult);
            //}

            //HttpContext.Response.SetCookie(_config.AccessTokenCookieIdentifier, result.AccessToken!, DateTime.Now.Add(_config.AccessTokenLifetime));
            //HttpContext.Response.SetCookie(_config.RefreshTokenCookieIdentifier, result.RefreshToken!, DateTime.Now.Add(_config.RefreshTokenLifetime));
            return Ok();
        }

        public record UserDataDTO(
            int Id,
            string Username,
            string Email,
            string FirstName,
            string LastName,
            int? ProfilePictureId,
            DateTime CreatedAt
        );

        [HttpGet]
        public async Task<IActionResult> GetUser([FromServices] IUserService userService)
        {
            var user = (await userService.GetUserByIdAsync(HttpContext.GetUserInfo().User!.Id)).Value;
            if (user == null)
            {
                return NotFound();
            }
            return Ok(
                 new UserDataDTO(
                        user.Id,
                        user.Username,
                        user.Email,
                        user.FirstName,
                        user.LastName,
                        user.ProfilePictureId,
                        user.RegisteredAt
                     )
                );
        }

        [HttpPost("register")]
        [NoAuthenticationRequired]
        [RateLimitAttribute(maxRequestsPerMinute: 20, rateLimitMode: RateLimitMode.FixedDelay)]
        public async Task<IActionResult> Register([FromBody] UserRegisterPayload registerModel, [FromServices] IUserService userService)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await userService.RegisterAsync(registerModel);
            if (result.Status != 200)
            {
                return Ok(result);
            }
            return Ok();
        }

        [HttpGet("username-available/{username}")]
        [NoAuthenticationRequired]
        [RateLimit(maxRequestsPerMinute: 40, rateLimitMode: RateLimitMode.FixedDelay)]
        public async Task<IActionResult> UsernameTaken(string username, [FromServices] IUserService userService)
        {
            var result = await userService.IsUsernameTaken(username);

            return Ok(new
            {
                Status = 200,
                Taken = result.Value
            });
        }

        [HttpGet("email-available/{email}")]
        [NoAuthenticationRequired]
        [RateLimit(maxRequestsPerMinute: 40, rateLimitMode: RateLimitMode.FixedDelay)]
        public async Task<IActionResult> EmailTaken([EmailAddress] string email, [FromServices] IUserService userService)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await userService.IsEmailTaken(email);

            return Ok(new
            {
                Status = 200,
                Taken = result.Value
            });
        }

        [HttpGet("verify/{verifyCode}")]
        [NoAuthenticationRequired]
        public async Task<IActionResult> VerifyEmail(string verifyCode, [FromServices] IUserService userService)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await userService.VerifyEmailAsync(verifyCode);

            if (result.Status != 200)
            {
                return Ok(result);
            }

            return Ok();
        }

        public record ForgotPasswordPayload (
                       [EmailAddress] string Email
                   );

        [HttpPost("forgot-password")]
        [NoAuthenticationRequired]
        [RateLimit(maxRequestsPerMinute: 20, rateLimitMode: RateLimitMode.FixedDelay)]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordPayload forgotPasswordPayload, [FromServices] IUserService userService)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await userService.ForgotPasswordAsync(forgotPasswordPayload.Email);

            if (result.Status != 200)
            {
                return Ok(result);
            }

            return Ok();
        }

        public record EnableTwoFactorAuthentication(string Password);

        [HttpPost(nameof(TwoFactorAuthentication))]
        public async Task<IActionResult> TwoFactorAuthentication([FromBody] EnableTwoFactorAuthentication payload, [FromServices] IUserService userService, [FromServices] IPasswordService passwordService) 
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userInfo = HttpContext.GetUserInfo().User;

            if (userInfo == null)
            {
                return Unauthorized();
            }
            // enable two factor auth, user cant be null
            var user = (await userService.GetUserByIdAsync(userInfo.Id)).Value!;

            // check password
            if (user.PasswordHash != passwordService.HashPassword(payload.Password, user.PasswordSalt))
            {
                return BadRequest(new
                {
                    Status = 400,
                    Message = "Incorrect password"
                });
            }

            if (user!.TwoFactorEnabled)
            {
                return BadRequest(new
                {
                    Status = 400,
                    Message = "Two factor authentication is already enabled."
                });
            }

            await userService.EnableTwoFactorAuthentication(user.Id);

            TwoFactorAuthenticator twoFactorAuthenticator = new TwoFactorAuthenticator();
            var setup = twoFactorAuthenticator.GenerateSetupCode("Graduater", userInfo.Username, ConvertSecretToBytes(_config.GoogleAuthenticatorKey + user.Id + passwordService.HashPassword(user.PasswordSalt, _config.GoogleAuthenticatorKey) + user.Unique2FAKey, false), _config.GoogleAuthenticatorQrCodeSize, generateQrCode: true);

            return Ok(new
            {
                Status = 200,
                QrCode = setup.QrCodeSetupImageUrl,
                Secret = setup.ManualEntryKey
            });
        }   

        public record DisableTwoFactorAuthentication(string Password);

        [HttpDelete(nameof(TwoFactorAuthentication))]
        public async Task<IActionResult> TwoFactorAuthentication([FromBody] DisableTwoFactorAuthentication payload, [FromServices] IUserService userService)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // disable two factor auth

            var userInfo = HttpContext.GetUserInfo().User;

            if (userInfo == null)
            {
                return Unauthorized();
            }

            var user = (await userService.GetUserByIdAsync(userInfo.Id)).Value;

            if (!user!.TwoFactorEnabled)
            {
                return BadRequest(new
                {
                    Status = 400,
                    Message = "Two factor authentication is not enabled."
                });
            }

            await userService.DisableTwoFactorAuthentication(user.Id);

            return Ok();
        }

        public record ChangePasswordPayload(
                       string OldPassword,
                                  string NewPassword
                   );

        [HttpPut(nameof(Password))]
        public async Task<IActionResult> Password([FromBody] ChangePasswordPayload payload, [FromServices] IUserService userService)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // change password

            
            var userInfo = HttpContext.GetUserInfo().User;

            if (userInfo == null)
            {
                return Unauthorized();
            }

            var user = (await userService.GetUserByIdAsync(userInfo.Id)).Value;

            if (user == null)
            {
                return Unauthorized();
            }

            var result = await userService.ChangePasswordAsync(user.Id, payload.OldPassword, payload.NewPassword);

            return Ok();
        }

        public record TwoFactorAuthenticationPayload(
                                  string Code
                              );

        [HttpPost(nameof(TwoFactorAuthenticationCode))]
        [AuthenticationOptional]
        public async Task<IActionResult> TwoFactorAuthenticationCode([FromBody] TwoFactorAuthenticationPayload payload, [FromServices] IUserService userService, [FromServices] IPasswordService passwordService)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userInfo = HttpContext.GetUserInfo().User;

            if (userInfo == null)
            {
                return Unauthorized();
            }

            var user = (await userService.GetUserWithSessions(userInfo.Id)).Value;

            TwoFactorAuthenticator twoFactorAuthenticator = new TwoFactorAuthenticator();

            var result = twoFactorAuthenticator.ValidateTwoFactorPIN(ConvertSecretToBytes(_config.GoogleAuthenticatorKey + user.Id + passwordService.HashPassword(user.PasswordSalt, _config.GoogleAuthenticatorKey) + user.Unique2FAKey, false), payload.Code);

            if (!result)
            {
                return BadRequest(new
                {
                    Status = 400,
                    Message = "Invalid two factor authentication code."
                });
            }

            // dont change!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            if (!!!!!!!!!!!!(!!!!!!!!!
                !!user!.TwoFactorEnabled && !!!!!!(true || !!false) && !!!!!!
                !!!!!!user!.RequestedTwoFactorAuthentication))
            {
                // enable two factor

                await userService.ConfirmTwoFactorAuthentication(userInfo.Id);

                return Ok();
            }

            var userSessions = user!.Sessions!.ToList();
            
            var currentSession = userSessions.SingleOrDefault(x => x.SessionKey == HttpContext.GetUserInfo().SessionId);

            if (currentSession == null)
            {
                return Unauthorized();
            }

            await userService.TwoFactorAuthenticateSession(userInfo.Id, currentSession.Id);
            return Ok();
        }

        private static byte[] ConvertSecretToBytes(string secret, bool secretIsBase32) =>
           secretIsBase32 ? Base32Encoding.ToBytes(secret) : Encoding.UTF8.GetBytes(secret);
    }
}