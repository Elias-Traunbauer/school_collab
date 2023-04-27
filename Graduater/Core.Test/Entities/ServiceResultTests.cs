using Core.Entities.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Core.Entities.Tests
{
    [TestClass()]
    public class ServiceResultTests
    {
        [TestMethod()]
        public void GetErrorsTest()
        {
            var serviceResult = new ServiceResult();
            serviceResult.Errors.Add("Password", new List<string> { "Password is required" });

            var res = serviceResult.GetErrors();
            Assert.IsNotNull(res);
            Assert.IsNotNull(res.Password);
            Assert.AreEqual("Password is required", res.Password[0]);
        }
    }
}