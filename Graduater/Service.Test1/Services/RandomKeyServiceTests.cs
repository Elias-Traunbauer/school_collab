﻿using Core.Contracts.Services;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Service.Services.Tests
{
    [TestClass()]
    public class RandomKeyServiceTests
    {
        [TestMethod()]
        public void GetRandomKeyTest()
        {
            IRandomKeyService service = new RandomKeyService();
            string test = service.GetRandomKey(256);
            string randomKey = service.GetRandomKey(128);

            Assert.IsNotNull(randomKey);
            Assert.AreEqual(128, randomKey.Length);

            randomKey = service.GetRandomKey(1024);

            Assert.IsNotNull(randomKey);
            Assert.AreEqual(1024, randomKey.Length);
        }

        [TestMethod()]
        public void GetRandomKeyRandomnessTest()
        {
            IRandomKeyService service = new RandomKeyService();
            string[] keys = new string[1_000_000];
            for (int i = 0; i < keys.Length; i++)
            {
                keys[i] = service.GetRandomKey(128);
            }

            Assert.AreEqual(keys.Length, keys.GroupBy(x => x).Count());
        }
    }
}