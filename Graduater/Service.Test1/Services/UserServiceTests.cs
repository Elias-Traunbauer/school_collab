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
            Assert.Fail();
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
        public void LoginAsyncTest()
        {
            Assert.Fail();
        }

        [TestMethod()]
        public void RegisterAsyncTest()
        {
            Assert.Fail();
        }

        [TestMethod()]
        public void ResetPasswordAsyncTest()
        {
            Assert.Fail();
        }

        [TestMethod()]
        public void VerifyEmailAsyncTest()
        {
            Assert.Fail();
        }

        [TestMethod()]
        public void UseRefreshTokenAsyncTest()
        {
            Assert.Fail();
        }
    }
}