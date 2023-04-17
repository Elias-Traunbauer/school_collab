using Api.DataTransferObjects;
using Api.Helpers;
using Core.Contracts;
using Core.Entities;
using Microsoft.AspNetCore.Mvc;
using Persistence;
using Ribbon.API.Attributes;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class UserController : Controller
    {
        private static readonly object InvalidLogin = new
        {
            Status = 401,
            Errors = new LoginModel(
                        Identifier: "Invalid username, email or password",
                        Password: "Invalid username, email or password"
                     )
        };

        private readonly ApiConfig _config;

        public UserController(ApiConfig configuration)
        {
            _config = configuration;
        }

        public record LoginModel (string Identifier, string Password);

        [HttpPost("login")]
        [NoAuthenticationRequired]
        public async Task<IActionResult> Login([FromBody] LoginModel loginInformation, [FromServices] IUnitOfWork uow)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            Func<string, Task<User?>>[] userSearchMethods = new Func<string, Task<User?>>[2] 
            {
                uow.UserRepository.GetUserByUsernameAsync, 
                uow.UserRepository.GetUserByEmailAsync
            };

            User? user = null;
            foreach (var searchMethod in userSearchMethods)
            {
                user = await searchMethod(loginInformation.Identifier);

                if (user != null)
                {
                    break;
                }
            }
            if (user == null)
            {
                return Ok(InvalidLogin);
            }
            string hashedInputPassword = PasswordHelper.HashPassword(loginInformation.Password, user.PasswordSalt);
            if (hashedInputPassword != user.PasswordHash)
            {
                return Ok(InvalidLogin);
            }

            var loginResult = await uow.UserRepository.LoginAsync(user.Id);

            if (loginResult == null)
            {
                return StatusCode(500);
            }

            HttpContext.Response.SetCookie(_config.AccessTokenCookieIdentifier, loginResult.Value.accessToken, DateTime.Now.Add(_config.AccessTokenLifetime));

            HttpContext.Response.SetCookie(_config.RefreshTokenCookieIdentifier, loginResult.Value.refreshToken, DateTime.Now.Add(_config.RefreshTokenLifetime));
            return Ok();
        }

        [HttpPost("register")]
        [NoAuthenticationRequired]
        public async Task<ActionResult> Register([FromBody] UserRegisterData registerModel, [FromServices] IUnitOfWork uow)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (registerModel.Password != registerModel.RepeatedPassword)
            {
                return Ok(new
                {
                    Status = 400,
                    Errors = new
                    {
                        RepeatedPassword = "Passwords do not match"
                    }
                });
            }
            if (await uow.UserRepository.GetUserByUsernameAsync(registerModel.Username) != null)
            {
                return Ok(new
                {
                    Status = 400,
                    Errors = new
                    {
                        Username = "Username already occupied"
                    }
                });
            }
            if (await uow.UserRepository.GetUserByEmailAsync(registerModel.Email) != null)
            {
                return Ok(new
                {
                    Status = 400,
                    Errors = new
                    {
                        Email = "Email already occupied"
                    }
                });
            }
            string passwordSalt = PasswordHelper.GenerateSalt();
            var user = new User
            {
                Username = registerModel.Username,
                FirstName = registerModel.Firstname,
                LastName = registerModel.Lastname,
                Email = registerModel.Email,
                PasswordSalt = PasswordHelper.GenerateSalt(),
                PasswordHash = PasswordHelper.HashPassword(registerModel.Password, passwordSalt),
            };
            await uow.UserRepository.CreateUserAsync(user);
            return Ok();
        }
    }
}
