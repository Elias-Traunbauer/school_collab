using Core.Entities.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Core.Contracts.Services
{
    public interface IJsonWebTokenService
    {
        string GenerateAccessToken(User user);
        string GenerateRefreshToken(User user, string sessionId);
        ClaimsPrincipal? ValidateToken(string token);
    }
}
