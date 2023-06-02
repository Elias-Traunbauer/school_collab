using Core.Contracts.Services;
using Core.Entities.Database;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Persistence;

namespace Service.Services.Tests
{
    [TestClass()]
    public class JsonWebTokenServiceTests
    {
        private readonly ApiConfig _config = new()
        {
            Secret = "SldUVEVTVFNFQ1JFVEpXVFRFU1RTRUNSRVRKV1RURVNUU0VDUkVUSldUVEVTVFNFQ1JFVEpXVFRFU1RTRUNSRVRKV1RURVNUU0VDUkVUSldUVEVTVFNFQ1JFVEpXVFRFU1RTRUNSRVRKSkpKSkpKSkpKSkpKSg==",
            Issuer = "JWTTESTISSUER",
            AccessTokenLifetime = TimeSpan.FromSeconds(60),
            RefreshTokenLifetime = TimeSpan.FromSeconds(60),
        };

        private readonly User _user = new()
        {
            Id = 10,
            Username = "testUsername",
            Permissions = UserPermission.View
        };

        [TestMethod()]
        public void GenerateAccessTokenTest()
        {
            IJsonWebTokenService jsonWebTokenService = new JsonWebTokenService(_config);
            string accessToken = jsonWebTokenService.GenerateAccessToken(_user);

            Assert.IsNotNull(accessToken);
            Assert.AreNotEqual(accessToken, "");
        }

        [TestMethod()]
        public void GenerateRefreshTokenTest()
        {
            IJsonWebTokenService jsonWebTokenService = new JsonWebTokenService(_config);
            string accessToken = jsonWebTokenService.GenerateRefreshToken(_user, "TESTSESSIONID");

            Assert.IsNotNull(accessToken);
            Assert.AreNotEqual(accessToken, "");
        }

        [TestMethod()]
        public void ValidateAccessTokenTest()
        {
            IJsonWebTokenService jsonWebTokenService = new JsonWebTokenService(_config);
            string accessToken = jsonWebTokenService.GenerateAccessToken(_user);

            Assert.IsNotNull(accessToken);
            Assert.AreNotEqual(accessToken, "");

            var result = jsonWebTokenService.ValidateToken(accessToken);

            Assert.IsNotNull(result);
        }

        [TestMethod()]
        public void ValidateRefreshTokenTest()
        {
            IJsonWebTokenService jsonWebTokenService = new JsonWebTokenService(_config);
            string refreshToken = jsonWebTokenService.GenerateRefreshToken(_user, "TESTSESSIONID");

            Assert.IsNotNull(refreshToken);
            Assert.AreNotEqual(refreshToken, "");

            var result = jsonWebTokenService.ValidateToken(refreshToken);

            Assert.IsNotNull(result);
        }

        [TestMethod()]
        public void ValidateRefreshTokenClaimsTest()
        {
            IJsonWebTokenService jsonWebTokenService = new JsonWebTokenService(_config);
            string accessToken = jsonWebTokenService.GenerateAccessToken(_user);

            Assert.IsNotNull(accessToken);
            Assert.AreNotEqual(accessToken, "");

            var result = jsonWebTokenService.ValidateToken(accessToken);

            Assert.IsNotNull(result);

            string name = result.Claims.Single(x => x.Type == "username").Value;
            int id = int.Parse(result.Claims.Single(x => x.Type == "userId").Value);
            UserPermission userPermission = (UserPermission)int.Parse(result.Claims.Single(x => x.Type == "userPermission").Value);

            Assert.IsNotNull(name);
            Assert.IsNotNull(id);
            Assert.IsNotNull(userPermission);

            Assert.AreEqual(_user.Username, name);
            Assert.AreEqual(_user.Id, id);
            Assert.AreEqual(_user.Permissions, userPermission);
        }

        [TestMethod()]
        public void ValidateAccessTokenClaimsTest()
        {
            string sessionKey = "SessionTest";
            IJsonWebTokenService jsonWebTokenService = new JsonWebTokenService(_config);
            string accessToken = jsonWebTokenService.GenerateRefreshToken(_user, sessionKey);

            Assert.IsNotNull(accessToken);
            Assert.AreNotEqual(accessToken, "");

            var result = jsonWebTokenService.ValidateToken(accessToken);

            Assert.IsNotNull(result);

            string sessionKeyResult = result.Claims.Single(x => x.Type == "sessionId").Value;
            int id = int.Parse(result.Claims.Single(x => x.Type == "userId").Value);

            Assert.IsNotNull(sessionKey);
            Assert.IsNotNull(id);

            Assert.AreEqual(_user.Id, id);
            Assert.AreEqual(sessionKey, sessionKeyResult);
        }
    }
}