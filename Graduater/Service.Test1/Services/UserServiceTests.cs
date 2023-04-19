using Core.Contracts;
using Core.Contracts.Services;
using Core.Entities.Database;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Persistence;
using Service.Helpers;
using Service.Services;
using Service.Test.Mocks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Org.BouncyCastle.Math.EC.ECCurve;

namespace Service.Services.Tests
{
    [TestClass()]
    public class UserServiceTests
    {
        readonly ApiConfig _config = new()
        {
            Secret = "SldUVEVTVFNFQ1JFVEpXVFRFU1RTRUNSRVRKV1RURVNUU0VDUkVUSldUVEVTVFNFQ1JFVEpXVFRFU1RTRUNSRVRKV1RURVNUU0VDUkVUSldUVEVTVFNFQ1JFVEpXVFRFU1RTRUNSRVRKSkpKSkpKSkpKSkpKSg==",
            Issuer = "JWTTESTISSUER",
            AccessTokenLifetime = TimeSpan.FromSeconds(60),
            RefreshTokenLifetime = TimeSpan.FromSeconds(60)
        };
        readonly IJsonWebTokenService _jsonWebTokenService;

        public UserServiceTests() 
        {
            _jsonWebTokenService = new JsonWebTokenService(_config);
        }

        [TestMethod()]
        public async Task ForgotPasswordAsyncTest()
        {
            IUserService userService = new UserService(new Test.Mocks.UnitOfWorkForTests().WithEntity(new User()
            {
                Username = "LoginAsyncTest",
                Email = "LoginAsyncTest@Test.com",
                PasswordSalt = "LoginAsyncTest",
                PasswordHash = PasswordHelper.HashPassword("LoginAsyncTest", "LoginAsyncTest")
            }), _jsonWebTokenService);

            var res = await userService.ForgotPasswordAsync("ForgotPasswordAsyncTest@Test.com");

            Assert.AreEqual(200, res.Status);
        }

        [TestMethod()]
        public async Task UsernameLoginAsyncTest()
        {
            IUserService userService = new UserService(new Test.Mocks.UnitOfWorkForTests().WithEntity(new User()
            {
                Username = "LoginAsyncTest",
                Email = "LoginAsyncTest@Test.com",
                PasswordSalt = "LoginAsyncTest",
                PasswordHash = PasswordHelper.HashPassword("LoginAsyncTest", "LoginAsyncTest")
            }), _jsonWebTokenService);

            var res = await userService.LoginAsync(new Core.Entities.Models.UserLoginPayload()
            {
                Identifier = "LoginAsyncTest",
                Password = "LoginAsyncTest"
            });

            Assert.AreEqual(200, res.ServiceResult.Status);
        }

        [TestMethod()]
        public async Task EmailLoginAsyncTest()
        {
            IUserService userService = new UserService(new Test.Mocks.UnitOfWorkForTests().WithEntity(new User()
            {
                Username = "LoginAsyncTest",
                Email = "LoginAsyncTest@Test.com",
                PasswordSalt = "LoginAsyncTest",
                PasswordHash = PasswordHelper.HashPassword("LoginAsyncTest", "LoginAsyncTest")
            }), _jsonWebTokenService);

            var res = await userService.LoginAsync(new Core.Entities.Models.UserLoginPayload()
            {
                Identifier = "LoginAsyncTest@Test.com",
                Password = "LoginAsyncTest"
            });

            Assert.AreEqual(200, res.ServiceResult.Status);
        }

        [TestMethod()]
        public async Task RegisterAsyncTest()
        {
            IUserService userService = new UserService(new Test.Mocks.UnitOfWorkForTests(), _jsonWebTokenService);
            var res = await userService.RegisterAsync(new Core.Contracts.Models.UserRegisterPayload()
            {
                Username = "ForgotPasswordAsyncTest",
                Firstname = "",
                Lastname = "",
                Email = "ForgotPasswordAsyncTest@Test.com",
                Password = "ForgotPasswordAsyncTest",
                RepeatedPassword = "ForgotPasswordAsyncTest"
            });

            Assert.AreEqual(200, res.Status);
        }

        [TestMethod()]
        public async Task ResetPasswordAsyncTest()
        {
            Assert.Fail();
        }

        [TestMethod()]
        public async Task VerifyEmailAsyncTest()
        {
            Assert.Fail();
        }
    }
}