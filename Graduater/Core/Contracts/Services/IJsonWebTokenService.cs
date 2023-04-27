using Core.Entities.Database;
using System.Security.Claims;

namespace Core.Contracts.Services
{
    public interface IJsonWebTokenService
    {
        string GenerateAccessToken(User user);

        string GenerateRefreshToken(User user, string sessionId);

        ClaimsPrincipal? ValidateToken(string token);
    }
}