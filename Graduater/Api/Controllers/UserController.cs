using Api.Attributes;
using Api.DataTransferObjects;
using Api.Helpers;
using Core.Contracts;
using Core.Contracts.Entities;
using Core.Contracts.Models;
using Core.Contracts.Services;
using Core.Entities;
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

            HttpContext.Response.SetCookie(_config.AccessTokenCookieIdentifier, result.AccessToken!, DateTime.Now.Add(_config.AccessTokenLifetime));
            HttpContext.Response.SetCookie(_config.RefreshTokenCookieIdentifier, result.RefreshToken!, DateTime.Now.Add(_config.RefreshTokenLifetime));
            return Ok();
        }

        [HttpPost("register")]
        [NoAuthenticationRequired]
        [RateLimit(maxRequestsPerMinute: 20, rateLimitMode: RateLimitMode.FixedDelay)]
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

        [HttpGet("isOccupied/username/{username}")]
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

        [HttpGet("isOccupied/email/{email}")]
        [NoAuthenticationRequired]
        [RateLimit(maxRequestsPerMinute: 40, rateLimitMode: RateLimitMode.FixedDelay)]
        public async Task<IActionResult> EmailTaken([EmailAddress] string email, [FromServices] IUserService userService)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await userService.IsUsernameTaken(email);

            return Ok(new
            {
                Status = 200,
                Taken = result.Value
            });
        }
    }
}
