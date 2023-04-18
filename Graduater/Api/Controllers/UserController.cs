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
using Ribbon.API.Attributes;

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

            //HttpContext.Response.SetCookie(_config.AccessTokenCookieIdentifier, loginResult.Value.accessToken, DateTime.Now.Add(_config.AccessTokenLifetime));

            //HttpContext.Response.SetCookie(_config.RefreshTokenCookieIdentifier, loginResult.Value.refreshToken, DateTime.Now.Add(_config.RefreshTokenLifetime));
            return Ok();
        }

        [HttpPost("register")]
        [NoAuthenticationRequired]
        public async Task<ActionResult> Register([FromBody] UserRegisterPayload registerModel, [FromServices] IUserService userService)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //if (registerModel.Password != registerModel.RepeatedPassword)
            //{
            //    return Ok(new
            //    {
            //        Status = 400,
            //        Errors = new
            //        {
            //            RepeatedPassword = "Passwords do not match"
            //        }
            //    });
            //}
            //if (await uow.UserRepository.GetUserByUsernameAsync(registerModel.Username) != null)
            //{
            //    return Ok(new
            //    {
            //        Status = 400,
            //        Errors = new
            //        {
            //            Username = "Username already occupied"
            //        }
            //    });
            //}
            //if (await uow.UserRepository.GetUserByEmailAsync(registerModel.Email) != null)
            //{
            //    return Ok(new
            //    {
            //        Status = 400,
            //        Errors = new
            //        {
            //            Email = "Email already occupied"
            //        }
            //    });
            //}
            //string passwordSalt = PasswordHelper.GenerateSalt();
            //var user = new User()
            //{
            //    Username = registerModel.Username,
            //    FirstName = registerModel.Firstname,
            //    LastName = registerModel.Lastname,
            //    Email = registerModel.Email,
            //    PasswordSalt = PasswordHelper.GenerateSalt(),
            //    PasswordHash = PasswordHelper.HashPassword(registerModel.Password, passwordSalt),
            //};
            //await uow.UserRepository.CreateUserAsync(user);
            return Ok();
        }
    }
}
