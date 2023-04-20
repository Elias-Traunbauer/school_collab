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
                Username = "ForgotPasswordAsyncTest",
                Email = "ForgotPasswordAsyncTest@Test.com",
                PasswordSalt = "ForgotPasswordAsyncTest",
                PasswordHash = PasswordHelper.HashPassword("ForgotPasswordAsyncTest", "ForgotPasswordAsyncTest")
            }), _jsonWebTokenService);

            var res = await userService.ForgotPasswordAsync("ForgotPasswordAsyncTest@Test.com");

            Assert.AreEqual(200, res.Status);
        }

        [TestMethod()]
        public async Task UsernameLoginAsyncTest()
        {
            IUserService userService = new UserService(new Test.Mocks.UnitOfWorkForTests().WithEntity(new User()
            {
                Username = "UsernameLoginAsyncTest",
                Email = "UsernameLoginAsyncTest@Test.com",
                PasswordSalt = "UsernameLoginAsyncTest",
                PasswordHash = PasswordHelper.HashPassword("UsernameLoginAsyncTest", "UsernameLoginAsyncTest")
            }), _jsonWebTokenService);

            var res = await userService.LoginAsync(new Core.Entities.Models.UserLoginPayload()
            {
                Identifier = "UsernameLoginAsyncTest",
                Password = "UsernameLoginAsyncTest"
            });

            Assert.AreEqual(200, res.ServiceResult.Status);
        }

        [TestMethod()]
        public async Task EmailLoginAsyncTest()
        {
            IUserService userService = new UserService(new Test.Mocks.UnitOfWorkForTests().WithEntity(new User()
            {
                Username = "EmailLoginAsyncTest",
                Email = "EmailLoginAsyncTest@Test.com",
                PasswordSalt = "EmailLoginAsyncTest",
                PasswordHash = PasswordHelper.HashPassword("EmailLoginAsyncTest", "EmailLoginAsyncTest")
            }), _jsonWebTokenService);

            var res = await userService.LoginAsync(new Core.Entities.Models.UserLoginPayload()
            {
                Identifier = "EmailLoginAsyncTest@Test.com",
                Password = "EmailLoginAsyncTest"
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
            IUserService userService = new UserService(new Test.Mocks.UnitOfWorkForTests().WithEntity(new User()
            {
                Username = "ResetPasswordAsyncTest",
                Email = "ResetPasswordAsyncTest@Test.com",
                PasswordSalt = "ResetPasswordAsyncTest",
                PasswordHash = PasswordHelper.HashPassword("ResetPasswordAsyncTest", "ResetPasswordAsyncTest"),
                PasswordResetToken = "ResetPasswordAsyncTest",
                PasswordResetTokenExpiration = DateTime.UtcNow.AddDays(1)
            }), _jsonWebTokenService);

            var res = await userService.ResetPasswordAsync(new Core.Contracts.Models.UserPasswordResetPayload()
            {
                Token = "ResetPasswordAsyncTest",
                Password = "ResetPasswordAsyncTest",
                RepeatPassword = "ResetPasswordAsyncTest"
            });

            Assert.AreEqual(200, res.Status);
        }

        [TestMethod()]
        public async Task VerifyEmailAsyncTest()
        {
            IUserService userService = new UserService(new Test.Mocks.UnitOfWorkForTests().WithEntity(new User()
            {
                Username = "VerifyEmailAsyncTest",
                Email = "VerifyEmailAsyncTest@Test.com",
                PasswordSalt = "ResetPaVerifyEmailAsyncTestsswordAsyncTest",
                PasswordHash = PasswordHelper.HashPassword("ResetPasswordAsyncTest", "ResetPasswordAsyncTest"),
                EmailVerificationToken = "ResetPasswordAsyncTest",
                EmailVerificationTokenExpiration = DateTime.UtcNow.AddDays(1)
            }), _jsonWebTokenService);

            var res = await userService.VerifyEmailAsync("ResetPasswordAsyncTest");

            Assert.AreEqual(200, res.Status);
        }

        [TestMethod()]
        public async Task ForgotPasswordInvalidAsyncTest()
        {
            IUserService userService = new UserService(new Test.Mocks.UnitOfWorkForTests().WithEntity(new User()
            {
                Username = "ForgotPasswordAsyncTest",
                Email = "ForgotPasswordAsyncTest@Test.com",
                PasswordSalt = "ForgotPasswordAsyncTest",
                PasswordHash = PasswordHelper.HashPassword("ForgotPasswordAsyncTest", "ForgotPasswordAsyncTest")
            }), _jsonWebTokenService);

            var res = await userService.ForgotPasswordAsync("WrongEmail@Test.com");

            Assert.AreEqual(200, res.Status);
        }

        [TestMethod()]
        public async Task UsernameLoginInvalidAsyncTest()
        {
            IUserService userService = new UserService(new Test.Mocks.UnitOfWorkForTests().WithEntity(new User()
            {
                Username = "UsernameLoginAsyncTest",
                Email = "UsernameLoginAsyncTest@Test.com",
                PasswordSalt = "EmailLoginAsyncTest",
                PasswordHash = PasswordHelper.HashPassword("UsernameLoginAsyncTest", "UsernameLoginAsyncTest")
            }), _jsonWebTokenService);

            var res = await userService.LoginAsync(new Core.Entities.Models.UserLoginPayload()
            {
                Identifier = "UsernameLoginAsyncTest",
                Password = "Wrong Password"
            });

            Assert.AreEqual(400, res.ServiceResult.Status);
        }

        [TestMethod()]
        public async Task EmailLoginInvalidAsyncTest()
        {
            IUserService userService = new UserService(new Test.Mocks.UnitOfWorkForTests().WithEntity(new User()
            {
                Username = "EmailLoginAsyncTest",
                Email = "EmailLoginAsyncTest@Test.com",
                PasswordSalt = "EmailLoginAsyncTest",
                PasswordHash = PasswordHelper.HashPassword("EmailLoginAsyncTest", "EmailLoginAsyncTest")
            }), _jsonWebTokenService);

            var res = await userService.LoginAsync(new Core.Entities.Models.UserLoginPayload()
            {
                Identifier = "EmailLoginAsyncTest@Test.com",
                Password = "Wrong Password"
            });

            Assert.AreEqual(400, res.ServiceResult.Status);
        }

        [TestMethod()]
        public async Task RegisterInvalidAsyncTest()
        {
            IUserService userService = new UserService(new Test.Mocks.UnitOfWorkForTests(), _jsonWebTokenService);
            var res = await userService.RegisterAsync(new Core.Contracts.Models.UserRegisterPayload()
            {
                Username = "F",
                Firstname = "",
                Lastname = "",
                Email = "Faulty email",
                Password = "ForgotPasswordAsyncTest",
                RepeatedPassword = "GGGGG"
            });

            Assert.AreEqual(400, res.Status);
        }

        [TestMethod()]
        public async Task ResetPasswordInvalidAsyncTest()
        {
            IUserService userService = new UserService(new Test.Mocks.UnitOfWorkForTests().WithEntity(new User()
            {
                Username = "ResetPasswordAsyncTest",
                Email = "ResetPasswordAsyncTest@Test.com",
                PasswordSalt = "ResetPasswordAsyncTest",
                PasswordHash = PasswordHelper.HashPassword("ResetPasswordAsyncTest", "ResetPasswordAsyncTest"),
                PasswordResetToken = "ResetPasswordAsyncTest",
                PasswordResetTokenExpiration = DateTime.UtcNow.AddDays(1)
            }), _jsonWebTokenService);

            var res = await userService.ResetPasswordAsync(new Core.Contracts.Models.UserPasswordResetPayload()
            {
                Token = "Wrong token",
                Password = "ResetPasswordAsyncTest",
                RepeatPassword = "ResetPasswordAsyncTest"
            });

            Assert.AreEqual(400, res.Status);
        }

        [TestMethod()]
        public async Task VerifyEmailInvalidAsyncTest()
        {
            IUserService userService = new UserService(new Test.Mocks.UnitOfWorkForTests().WithEntity(new User()
            {
                Username = "VerifyEmailAsyncTest",
                Email = "VerifyEmailAsyncTest@Test.com",
                PasswordSalt = "ResetPaVerifyEmailAsyncTestsswordAsyncTest",
                PasswordHash = PasswordHelper.HashPassword("ResetPasswordAsyncTest", "ResetPasswordAsyncTest"),
                EmailVerificationToken = "ResetPasswordAsyncTest",
                EmailVerificationTokenExpiration = DateTime.UtcNow.AddDays(1)
            }), _jsonWebTokenService);

            var res = await userService.VerifyEmailAsync("Wrong token");

            Assert.AreEqual(400, res.Status);
        }
    }
}