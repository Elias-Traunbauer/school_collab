using Core.Contracts.Repositories;
using Core.Contracts.Services;
using Core.Contracts;
using Core.Entities.Database;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Persistence.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Moq;

namespace Persistence.Repositories.Tests
{
    [TestClass()]
    public class AssignmentRepositoryTests
    {
        [TestMethod()]
        public void AssignmentRepositoryTest()
        {
            Assert.AreNotSame(true, false);
        }

        [TestMethod()]
        public void CreateAssignmentAsyncTest()
        {
            var userRepository = new Mock<IAssignmentRepository>();
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
        public void DeleteAssignmentAsyncTest()
        {
            Assert.Fail();
        }

        [TestMethod()]
        public void GetAllAssignmentsAsyncTest()
        {
            Assert.Fail();
        }

        [TestMethod()]
        public void GetAssignmentByIdAsyncTest()
        {
            Assert.Fail();
        }
    }
}