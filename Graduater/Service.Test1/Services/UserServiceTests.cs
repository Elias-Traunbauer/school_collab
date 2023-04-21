using Core.Contracts;
using Core.Contracts.Entities;
using Core.Contracts.Repositories;
using Core.Contracts.Services;
using Core.Entities.Database;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Persistence;
using Persistence.Repositories;
using Service.Services;
using Service.Test.Mocks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services.Tests
{
    [TestClass()]
    public class UserServiceTests
    {
        private static readonly string RandomKeyServiceResult = "testRandomKey";

        private static IJsonWebTokenService JsonWebTokenServiceMock
        {
            get
            {
                var jsonWebTokenServiceMock = new Mock<IJsonWebTokenService>();
                jsonWebTokenServiceMock.Setup(x => x.GenerateAccessToken(It.IsAny<User>()))
                    .Returns("testAccessToken");
                jsonWebTokenServiceMock.Setup(x => x.GenerateRefreshToken(It.IsAny<User>(), It.IsAny<string>()))
                    .Returns("testRefreshToken");

                return jsonWebTokenServiceMock.Object;
            }
        }

        private static IRandomKeyService RandomKeyServiceMock
        {
            get
            {
                var randomKeyServiceMock = new Mock<IRandomKeyService>();
                randomKeyServiceMock.Setup(x => x.GetRandomKey(It.IsAny<int>()))
                    .Returns(RandomKeyServiceResult);

                return randomKeyServiceMock.Object;
            }
        }

        private static IPasswordService PasswordServiceMock
        {
            get
            {
                var randomKeyServiceMock = new Mock<IPasswordService>();
                randomKeyServiceMock.Setup(x => x.HashPassword(It.IsAny<string>(), It.IsAny<string>()))
                    .Returns("testPasswordHash");

                return randomKeyServiceMock.Object;
            }
        }

        [TestMethod()]
        public void UserServiceTest()
        {
            var unitOfWork = new Mock<IUnitOfWork>();
            IUserService userService = new UserService(unitOfWork.Object, JsonWebTokenServiceMock, PasswordServiceMock, RandomKeyServiceMock);
            Assert.IsNotNull(userService);
        }

        [TestMethod()]
        public void ForgotPasswordAsyncTest()
        {
            IUser user = new User()
            {
                Email = "test@email.com"
            };

            var userRepository = new Mock<IUserRepository>();
            userRepository.Setup(x => x.GetUserByEmailAsync("test@email.com"))
                .ReturnsAsync(user);

            var unitOfWork = new Mock<IUnitOfWork>();
            unitOfWork.Setup(x => x.UserRepository)
                .Returns(userRepository.Object);

            IUserService userService = new UserService(unitOfWork.Object, JsonWebTokenServiceMock, PasswordServiceMock, RandomKeyServiceMock);

            userService.ForgotPasswordAsync("test@email.com");

            Assert.AreEqual(RandomKeyServiceResult, user.PasswordResetToken);
            Assert.IsTrue(user.PasswordResetTokenExpiration > DateTime.UtcNow);
        }

        [TestMethod()]
        public async Task LoginUsernameAsyncTest()
        {
            IUser user = new User()
            {
                Username = "testUsername",
                PasswordHash = PasswordServiceMock.HashPassword("", ""),
                UserSessions = new List<UserSession>()
            };

            var userRepository = new Mock<IUserRepository>();
            userRepository.Setup(x => x.GetUserByUsernameAsync("testUsername"))
                .ReturnsAsync(user);

            var unitOfWork = new Mock<IUnitOfWork>();
            unitOfWork.Setup(x => x.UserRepository)
                .Returns(userRepository.Object);

            IUserService userService = new UserService(unitOfWork.Object, JsonWebTokenServiceMock, PasswordServiceMock, RandomKeyServiceMock);

            var res = await userService.LoginAsync(new Core.Entities.Models.UserLoginPayload()
            {
                Identifier = "testUsername",
                Password = "doesntMatter"
            });

            Assert.AreEqual(200, res.ServiceResult.Status);
            Assert.IsNotNull(res.AccessToken);
            Assert.IsNotNull(res.RefreshToken);
            Assert.AreEqual(1, user.UserSessions?.Count ?? 0);
            Assert.AreEqual(RandomKeyServiceResult, user.UserSessions!.Single().SessionKey);
        }

        [TestMethod()]
        public async Task LoginEmailAsyncTest()
        {
            IUser user = new User()
            {
                Email = "test@email.com",
                PasswordHash = PasswordServiceMock.HashPassword("", ""),
                UserSessions = new List<UserSession>()
            };

            var userRepository = new Mock<IUserRepository>();
            userRepository.Setup(x => x.GetUserByEmailAsync("test@email.com"))
                .ReturnsAsync(user);

            var unitOfWork = new Mock<IUnitOfWork>();
            unitOfWork.Setup(x => x.UserRepository)
                .Returns(userRepository.Object);

            IUserService userService = new UserService(unitOfWork.Object, JsonWebTokenServiceMock, PasswordServiceMock, RandomKeyServiceMock);

            var res = await userService.LoginAsync(new Core.Entities.Models.UserLoginPayload()
            {
                Identifier = "test@email.com",
                Password = "doesntMatter"
            });

            Assert.AreEqual(200, res.ServiceResult.Status);
            Assert.IsNotNull(res.AccessToken);
            Assert.IsNotNull(res.RefreshToken);
            Assert.AreEqual(1, user.UserSessions!.Count);
            Assert.AreEqual(RandomKeyServiceResult, user.UserSessions.Single().SessionKey);
        }

        [TestMethod()]
        public async Task LoginUsernameInvalidAsyncTest()
        {
            IUser user = new User()
            {
                Username = "testUsername",
                UserSessions = new List<UserSession>()
            };

            var userRepository = new Mock<IUserRepository>();
            userRepository.Setup(x => x.GetUserByUsernameAsync("testUsername"))
                .ReturnsAsync(user);

            var unitOfWork = new Mock<IUnitOfWork>();
            unitOfWork.Setup(x => x.UserRepository)
                .Returns(userRepository.Object);

            IUserService userService = new UserService(unitOfWork.Object, JsonWebTokenServiceMock, PasswordServiceMock, RandomKeyServiceMock);

            var res = await userService.LoginAsync(new Core.Entities.Models.UserLoginPayload()
            {
                Identifier = "WrongUsername",
                Password = "doesntMatter"
            });

            Assert.AreEqual(401, res.ServiceResult.Status);
            Assert.IsNull(res.AccessToken);
            Assert.IsNull(res.RefreshToken);
            Assert.AreEqual(0, user.UserSessions?.Count ?? -1);
        }

        [TestMethod()]
        public async Task LoginEmailInvalidAsyncTest()
        {
            IUser user = new User()
            {
                Email = "test@email.com",
                UserSessions = new List<UserSession>()
            };

            var userRepository = new Mock<IUserRepository>();
            userRepository.Setup(x => x.GetUserByEmailAsync("test@email.com"))
                .ReturnsAsync(user);

            var unitOfWork = new Mock<IUnitOfWork>();
            unitOfWork.Setup(x => x.UserRepository)
                .Returns(userRepository.Object);

            IUserService userService = new UserService(unitOfWork.Object, JsonWebTokenServiceMock, PasswordServiceMock, RandomKeyServiceMock);

            var res = await userService.LoginAsync(new Core.Entities.Models.UserLoginPayload()
            {
                Identifier = "wrongEmail@email.com",
                Password = "doesntMatter"
            });

            Assert.AreEqual(401, res.ServiceResult.Status);
            Assert.IsNull(res.AccessToken);
            Assert.IsNull(res.RefreshToken);
            Assert.AreEqual(0, user.UserSessions!.Count);
        }

        [TestMethod()]
        public async Task RegisterAsyncTest()
        {
            var userRepository = new Mock<IUserRepository>();
            userRepository.Setup(x => x.GetUserByEmailAsync(It.IsAny<string>()))
                .ReturnsAsync((User?)null);
            userRepository.Setup(x => x.GetUserByUsernameAsync(It.IsAny<string>()))
                .ReturnsAsync((User?)null);
            userRepository.Setup(x => x.CreateUserAsync(It.IsAny<User>())).Verifiable();

            var unitOfWork = new Mock<IUnitOfWork>();
            unitOfWork.Setup(x => x.UserRepository)
                .Returns(userRepository.Object);

            IUserService userService = new UserService(unitOfWork.Object, JsonWebTokenServiceMock, PasswordServiceMock, RandomKeyServiceMock);

            var res = await userService.RegisterAsync(new Core.Contracts.Models.UserRegisterPayload()
            {
                Username = "notImportant",
                Firstname = "notImportant",
                Lastname = "notImportant",
                Email = "notImportant@email.com",
                Password = "same",
                RepeatedPassword = "same"
            });

            Assert.IsNotNull(res);
            Assert.AreEqual(200, res.Status);
            userRepository.Verify(x => x.CreateUserAsync(It.IsAny<User>()));
        }

        [TestMethod()]
        public async Task RegisterExistingEmailAsyncTest()
        {
            IUser user = new User()
            {
                Email = "test@email.com",
                PasswordHash = PasswordServiceMock.HashPassword("", "")
            };

            var userRepository = new Mock<IUserRepository>();
            userRepository.Setup(x => x.GetUserByEmailAsync("test@email.com"))
                .ReturnsAsync(user);
            userRepository.Setup(x => x.GetUserByUsernameAsync(It.IsAny<string>()))
                .ReturnsAsync((User?)null);
            userRepository.Setup(x => x.CreateUserAsync(It.IsAny<User>())).Verifiable();

            var unitOfWork = new Mock<IUnitOfWork>();
            unitOfWork.Setup(x => x.UserRepository)
                .Returns(userRepository.Object);

            IUserService userService = new UserService(unitOfWork.Object, JsonWebTokenServiceMock, PasswordServiceMock, RandomKeyServiceMock);

            var res = await userService.RegisterAsync(new Core.Contracts.Models.UserRegisterPayload()
            {
                Username = "notImportant",
                Firstname = "notImportant",
                Lastname = "notImportant",
                Email = "test@email.com",
                Password = "same",
                RepeatedPassword = "same"
            });

            Assert.IsNotNull(res);
            Assert.AreEqual(400, res.Status);
        }

        [TestMethod()]
        public async Task RegisterExistingUsernameAsyncTest()
        {
            IUser user = new User()
            {
                Username = "test",
                PasswordHash = PasswordServiceMock.HashPassword("", "")
            };

            var userRepository = new Mock<IUserRepository>();
            userRepository.Setup(x => x.GetUserByEmailAsync(It.IsAny<string>()))
                .ReturnsAsync((User?)null);
            userRepository.Setup(x => x.GetUserByUsernameAsync("test"))
                .ReturnsAsync(user);
            userRepository.Setup(x => x.CreateUserAsync(It.IsAny<User>())).Verifiable();

            var unitOfWork = new Mock<IUnitOfWork>();
            unitOfWork.Setup(x => x.UserRepository)
                .Returns(userRepository.Object);

            IUserService userService = new UserService(unitOfWork.Object, JsonWebTokenServiceMock, PasswordServiceMock, RandomKeyServiceMock);

            var res = await userService.RegisterAsync(new Core.Contracts.Models.UserRegisterPayload()
            {
                Username = "test",
                Firstname = "notImportant",
                Lastname = "notImportant",
                Email = "test@email.com",
                Password = "same",
                RepeatedPassword = "same"
            });

            Assert.IsNotNull(res);
            Assert.AreEqual(400, res.Status);
        }

        [TestMethod()]
        public async Task ResetPasswordAsyncTest()
        {
            IUser user = new User()
            {
                PasswordResetToken = "testToken",
                PasswordResetTokenExpiration = DateTime.UtcNow.AddMinutes(5)
            };

            var userRepository = new Mock<IUserRepository>();
            userRepository.Setup(x => x.GetUserByPasswordResetTokenAsync("testToken"))
                .ReturnsAsync(user);

            var unitOfWork = new Mock<IUnitOfWork>();
            unitOfWork.Setup(x => x.UserRepository)
                .Returns(userRepository.Object);

            IUserService userService = new UserService(unitOfWork.Object, JsonWebTokenServiceMock, PasswordServiceMock, RandomKeyServiceMock);

            var res = await userService.ResetPasswordAsync(new Core.Contracts.Models.UserPasswordResetPayload()
            {
                Token = "testToken",
                Password = "newPassword",
                RepeatPassword = "newPassword"
            });

            Assert.AreEqual(200, res.Status);
            Assert.AreEqual("testPasswordHash", user.PasswordHash);
        }

        [TestMethod()]
        public async Task ResetPasswordInvalidAsyncTest()
        {
            IUser user = new User()
            {
                PasswordResetToken = "testToken",
                PasswordResetTokenExpiration = DateTime.UtcNow.AddMinutes(5)
            };

            var userRepository = new Mock<IUserRepository>();
            userRepository.Setup(x => x.GetUserByPasswordResetTokenAsync("testToken"))
                .ReturnsAsync(user);

            var unitOfWork = new Mock<IUnitOfWork>();
            unitOfWork.Setup(x => x.UserRepository)
                .Returns(userRepository.Object);

            IUserService userService = new UserService(unitOfWork.Object, JsonWebTokenServiceMock, PasswordServiceMock, RandomKeyServiceMock);

            var res = await userService.ResetPasswordAsync(new Core.Contracts.Models.UserPasswordResetPayload()
            {
                Token = "invalidToken",
                Password = "newPassword",
                RepeatPassword = "newPassword"
            });

            var errors = res.GetErrors();
            Assert.AreEqual(400, res.Status);
            Assert.IsNotNull(errors.Token);
            Assert.AreEqual("Token not found", errors.Token[0]);
        }

        [TestMethod()]
        public async Task ResetPasswordInvalidRepeatPasswordAsyncTest()
        {
            IUser user = new User()
            {
                PasswordResetToken = "testToken",
                PasswordResetTokenExpiration = DateTime.UtcNow.AddMinutes(5)
            };

            var userRepository = new Mock<IUserRepository>();
            userRepository.Setup(x => x.GetUserByPasswordResetTokenAsync("testToken"))
                .ReturnsAsync(user);

            var unitOfWork = new Mock<IUnitOfWork>();
            unitOfWork.Setup(x => x.UserRepository)
                .Returns(userRepository.Object);

            IUserService userService = new UserService(unitOfWork.Object, JsonWebTokenServiceMock, PasswordServiceMock, RandomKeyServiceMock);

            var res = await userService.ResetPasswordAsync(new Core.Contracts.Models.UserPasswordResetPayload()
            {
                Token = "testToken",
                Password = "newPassword",
                RepeatPassword = "wrongRepeatPassword"
            });

            var errors = res.GetErrors();
            Assert.AreEqual(400, res.Status);
            Assert.IsNotNull(errors.RepeatPassword);
            Assert.AreEqual("Passwords do not match", errors.RepeatPassword[0]);
        }

        [TestMethod()]
        public async Task VerifyEmailAsyncTest()
        {
            IUser user = new User()
            {
                EmailVerificationToken = "testToken",
                EmailVerificationTokenExpiration = DateTime.UtcNow.AddMinutes(5)
            };

            var userRepository = new Mock<IUserRepository>();
            userRepository.Setup(x => x.GetUserByEmailVerificationTokenAsync("testToken"))
                .ReturnsAsync(user);

            var unitOfWork = new Mock<IUnitOfWork>();
            unitOfWork.Setup(x => x.UserRepository)
                .Returns(userRepository.Object);

            IUserService userService = new UserService(unitOfWork.Object, JsonWebTokenServiceMock, PasswordServiceMock, RandomKeyServiceMock);

            var res = await userService.VerifyEmailAsync("testToken");

            Assert.AreEqual(200, res.Status);
            Assert.AreEqual(UserPermission.Default, user.Permissions);
        }

        [TestMethod()]
        public async Task UseRefreshTokenAsyncTest()
        {
            IUser user = new User()
            {
                Id = 0,
                UserSessions = new List<UserSession>()
                {
                    new UserSession()
                    {
                        SessionKey = "testKey",
                        Expires = DateTime.UtcNow.AddMinutes(5)
                    }
                }
            };

            var userRepository = new Mock<IUserRepository>();
            userRepository.Setup(x => x.GetUserByIdAsync(0))
                .ReturnsAsync(user);

            var unitOfWork = new Mock<IUnitOfWork>();
            unitOfWork.Setup(x => x.UserRepository)
                .Returns(userRepository.Object);

            IUserService userService = new UserService(unitOfWork.Object, JsonWebTokenServiceMock, PasswordServiceMock, RandomKeyServiceMock);

            var res = await userService.UseRefreshTokenAsync(0, "testKey");

            Assert.AreEqual(200, res.Status);
            Assert.IsNotNull(res.Result);
        }

        [TestMethod()]
        public async Task UseRefreshTokenInvalidAsyncTest()
        {
            IUser user = new User()
            {
                Id = 0,
                UserSessions = new List<UserSession>()
                {
                    new UserSession()
                    {
                        SessionKey = "testKey",
                        Expires = DateTime.UtcNow.AddMinutes(5)
                    }
                }
            };

            var userRepository = new Mock<IUserRepository>();
            userRepository.Setup(x => x.GetUserByIdAsync(0))
                .ReturnsAsync(user);

            var unitOfWork = new Mock<IUnitOfWork>();
            unitOfWork.Setup(x => x.UserRepository)
                .Returns(userRepository.Object);

            IUserService userService = new UserService(unitOfWork.Object, JsonWebTokenServiceMock, PasswordServiceMock, RandomKeyServiceMock);

            var res = await userService.UseRefreshTokenAsync(0, "wrongKey");

            Assert.AreEqual(400, res.Status);
        }
    }
}