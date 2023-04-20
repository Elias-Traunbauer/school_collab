using Core.Contracts;
using Core.Contracts.Services;
using Core.Entities.Database;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Mysqlx.Notice;
using Persistence;
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
            IPasswordService passwordService = new PasswordService();
            IRandomKeyService randomKeyService = new RandomKeyService();
            IUserService userService = new UserService(new Test.Mocks.UnitOfWorkForTests().WithEntity(new User()
            {
                Username = "ForgotPasswordAsyncTest",
                Email = "ForgotPasswordAsyncTest@Test.com",
            }), _jsonWebTokenService, passwordService, randomKeyService);

            var res = await userService.ForgotPasswordAsync("ForgotPasswordAsyncTest@Test.com");

            Assert.AreEqual(200, res.Status);
        }

        [TestMethod()]
        public async Task LoginUsernameAsyncTest()
        {
            IPasswordService passwordService = new PasswordService();
            IRandomKeyService randomKeyService = new RandomKeyService();
            IUserService userService = new UserService(new Test.Mocks.UnitOfWorkForTests().WithEntity(new User()
            {
                Username = "UsernameLoginAsyncTest",
                Email = "UsernameLoginAsyncTest@Test.com",
                PasswordSalt = "UsernameLoginAsyncTest",
                PasswordHash = passwordService.HashPassword("UsernameLoginAsyncTest", "UsernameLoginAsyncTest")
            }), _jsonWebTokenService, passwordService, randomKeyService);

            var res = await userService.LoginAsync(new Core.Entities.Models.UserLoginPayload()
            {
                Identifier = "UsernameLoginAsyncTest",
                Password = "UsernameLoginAsyncTest"
            });

            Assert.AreEqual(200, res.ServiceResult.Status);
        }

        [TestMethod()]
        public async Task LoginEmailAsyncTest()
        {
            IPasswordService passwordService = new PasswordService();
            IRandomKeyService randomKeyService = new RandomKeyService();
            IUserService userService = new UserService(new Test.Mocks.UnitOfWorkForTests().WithEntity(new User()
            {
                Username = "EmailLoginAsyncTest",
                Email = "EmailLoginAsyncTest@Test.com",
                PasswordSalt = "EmailLoginAsyncTest",
                PasswordHash = passwordService.HashPassword("EmailLoginAsyncTest", "EmailLoginAsyncTest")
            }), _jsonWebTokenService, passwordService, randomKeyService);

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
            IPasswordService passwordService = new PasswordService();
            IRandomKeyService randomKeyService = new RandomKeyService();
            IUserService userService = new UserService(new Test.Mocks.UnitOfWorkForTests(), _jsonWebTokenService, passwordService, randomKeyService);
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
            IPasswordService passwordService = new PasswordService();
            IRandomKeyService randomKeyService = new RandomKeyService();
            IUserService userService = new UserService(new Test.Mocks.UnitOfWorkForTests().WithEntity(new User()
            {
                Username = "ResetPasswordAsyncTest",
                Email = "ResetPasswordAsyncTest@Test.com",
                PasswordSalt = "ResetPasswordAsyncTest",
                PasswordHash = passwordService.HashPassword("ResetPasswordAsyncTest", "ResetPasswordAsyncTest"),
                PasswordResetToken = "ResetPasswordAsyncTest",
                PasswordResetTokenExpiration = DateTime.UtcNow.AddDays(1)
            }), _jsonWebTokenService, passwordService, randomKeyService);

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
            IPasswordService passwordService = new PasswordService();
            IRandomKeyService randomKeyService = new RandomKeyService();
            IUserService userService = new UserService(new Test.Mocks.UnitOfWorkForTests().WithEntity(new User()
            {
                Username = "VerifyEmailAsyncTest",
                Email = "VerifyEmailAsyncTest@Test.com",
                PasswordSalt = "ResetPaVerifyEmailAsyncTestsswordAsyncTest",
                PasswordHash = passwordService.HashPassword("ResetPasswordAsyncTest", "ResetPasswordAsyncTest"),
                EmailVerificationToken = "ResetPasswordAsyncTest",
                EmailVerificationTokenExpiration = DateTime.UtcNow.AddDays(1)
            }), _jsonWebTokenService, passwordService, randomKeyService);

            var res = await userService.VerifyEmailAsync("ResetPasswordAsyncTest");

            Assert.AreEqual(200, res.Status);
        }

        [TestMethod()]
        public async Task ForgotPasswordInvalidAsyncTest()
        {
            IPasswordService passwordService = new PasswordService();
            IRandomKeyService randomKeyService = new RandomKeyService();
            IUserService userService = new UserService(new Test.Mocks.UnitOfWorkForTests().WithEntity(new User()
            {
                Username = "ForgotPasswordAsyncTest",
                Email = "ForgotPasswordAsyncTest@Test.com",
                PasswordSalt = "ForgotPasswordAsyncTest",
                PasswordHash = passwordService.HashPassword("ForgotPasswordAsyncTest", "ForgotPasswordAsyncTest")
            }), _jsonWebTokenService, passwordService, randomKeyService);

            var res = await userService.ForgotPasswordAsync("WrongEmail@Test.com");

            // 200 because this could compromise a taken email
            Assert.AreEqual(200, res.Status);
        }

        [TestMethod()]
        public async Task LoginUsernameInvalidAsyncTest()
        {
            IPasswordService passwordService = new PasswordService();
            IRandomKeyService randomKeyService = new RandomKeyService();
            IUserService userService = new UserService(new Test.Mocks.UnitOfWorkForTests().WithEntity(new User()
            {
                Username = "UsernameLoginAsyncTest",
                Email = "UsernameLoginAsyncTest@Test.com",
                PasswordSalt = "EmailLoginAsyncTest",
                PasswordHash = passwordService.HashPassword("UsernameLoginAsyncTest", "UsernameLoginAsyncTest")
            }), _jsonWebTokenService, passwordService, randomKeyService);

            var res = await userService.LoginAsync(new Core.Entities.Models.UserLoginPayload()
            {
                Identifier = "UsernameLoginAsyncTest",
                Password = "Wrong Password"
            });

            Assert.AreEqual(401, res.ServiceResult.Status);
        }

        [TestMethod()]
        public async Task LoginEmailInvalidAsyncTest()
        {
            IPasswordService passwordService = new PasswordService();
            IRandomKeyService randomKeyService = new RandomKeyService();
            IUserService userService = new UserService(new Test.Mocks.UnitOfWorkForTests().WithEntity(new User()
            {
                Username = "EmailLoginAsyncTest",
                Email = "EmailLoginAsyncTest@Test.com",
                PasswordSalt = "EmailLoginAsyncTest",
                PasswordHash = passwordService.HashPassword("EmailLoginAsyncTest", "EmailLoginAsyncTest")
            }), _jsonWebTokenService, passwordService, randomKeyService);

            var res = await userService.LoginAsync(new Core.Entities.Models.UserLoginPayload()
            {
                Identifier = "EmailLoginAsyncTest@Test.com",
                Password = "Wrong Password"
            });

            Assert.AreEqual(401, res.ServiceResult.Status);
        }

        [TestMethod()]
        public async Task RegisterInvalidAsyncTest()
        {
            IPasswordService passwordService = new PasswordService();
            IRandomKeyService randomKeyService = new RandomKeyService();
            IUserService userService = new UserService(new Test.Mocks.UnitOfWorkForTests(), _jsonWebTokenService, passwordService, randomKeyService);
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
            IPasswordService passwordService = new PasswordService();
            IRandomKeyService randomKeyService = new RandomKeyService();
            IUserService userService = new UserService(new Test.Mocks.UnitOfWorkForTests().WithEntity(new User()
            {
                Username = "ResetPasswordAsyncTest",
                Email = "ResetPasswordAsyncTest@Test.com",
                PasswordSalt = "ResetPasswordAsyncTest",
                PasswordHash = passwordService.HashPassword("ResetPasswordAsyncTest", "ResetPasswordAsyncTest"),
                PasswordResetToken = "ResetPasswordAsyncTest",
                PasswordResetTokenExpiration = DateTime.UtcNow.AddDays(1)
            }), _jsonWebTokenService, passwordService, randomKeyService);

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
            IPasswordService passwordService = new PasswordService();
            IRandomKeyService randomKeyService = new RandomKeyService();
            IUserService userService = new UserService(new Test.Mocks.UnitOfWorkForTests().WithEntity(new User()
            {
                Username = "VerifyEmailAsyncTest",
                Email = "VerifyEmailAsyncTest@Test.com",
                PasswordSalt = "ResetPaVerifyEmailAsyncTestsswordAsyncTest",
                PasswordHash = passwordService.HashPassword("ResetPasswordAsyncTest", "ResetPasswordAsyncTest"),
                EmailVerificationToken = "ResetPasswordAsyncTest",
                EmailVerificationTokenExpiration = DateTime.UtcNow.AddDays(1)
            }), _jsonWebTokenService, passwordService, randomKeyService);

            var res = await userService.VerifyEmailAsync("Wrong token");

            Assert.AreEqual(400, res.Status);
        }

        [TestMethod()]
        public async Task UseRefreshTokenAsyncTest()
        {
            IPasswordService passwordService = new PasswordService();
            IRandomKeyService randomKeyService = new RandomKeyService();
            IUserService userService = new UserService(new Test.Mocks.UnitOfWorkForTests().WithEntity(new User()
            {
                Id=1,
                Username = "UseRefreshTokenAsyncTest",
                Email = "UseRefreshTokenAsyncTest@Test.com",
                PasswordSalt = "UseRefreshTokenAsyncTest",
                PasswordHash = passwordService.HashPassword("UseRefreshTokenAsyncTest", "UseRefreshTokenAsyncTest"),
                EmailVerificationToken = "ResetPasswordAsyncTest",
                EmailVerificationTokenExpiration = DateTime.UtcNow.AddDays(1),
                UserSessions = new List<UserSession>()
                {
                    new UserSession()
                    {
                        SessionKey = "Bofian",
                        Expires = DateTime.UtcNow.AddDays(1),
                        
                    }
                }
            }), _jsonWebTokenService, passwordService, randomKeyService);

            var res = await userService.UseRefreshTokenAsync(1, "Bofian");

            Assert.AreEqual(200, res.ServiceResult.Status);
            Assert.IsNotNull(res.AccessToken);
            Assert.IsNull(res.RefreshToken);
        }
    }
}