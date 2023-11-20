using Api.Attributes;
using Api.DataTransferObjects;
using Api.Helpers;
using Core.Contracts.Models;
using Core.Contracts.Services;
using Core.Entities.Database;
using Core.Entities.Models;
using Microsoft.AspNetCore.Mvc;
using Persistence;
using System.ComponentModel.DataAnnotations;

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
            return Ok();
        }

        [HttpGet("{id}")]
        [EndpointPermission(UserPermission.View)]
        [RateLimit(maxRequestsPerMinute: 20, rateLimitMode: RateLimitMode.SlidingTimeWindow)]
        public async Task<IActionResult> GetUser([FromRoute] int id, [FromServices] IUserService userService)
        {
            var user = (await userService.GetUser(id)).Value;
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
                      users!.Cast<UserDTO>()
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
            var user = (await userService.GetUser(HttpContext.GetUserInfo().User!.Id)).Value;
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
    }
}