using Microsoft.VisualStudio.TestTools.UnitTesting;
using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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