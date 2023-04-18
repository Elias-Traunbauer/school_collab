using Core.Contracts;
using Core.Contracts.Services;
using Core.Entities.Database;
using Microsoft.IdentityModel.Tokens;
using Persistence;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services
{
    public class JsonWebTokenService : IJsonWebTokenService
    {
        private readonly ApiConfig _config;

        public JsonWebTokenService(ApiConfig config)
        {
            _config = config;
        }

        /// <summary>
        /// Generates a new access token for a user
        /// </summary>
        /// <param name="user">The user to generate the token for</param>
        /// <returns></returns>
        public string GenerateAccessToken(User user)
        {
            var keyBytes = Convert.FromBase64String(_config.Secret);
            var securityKey = new SymmetricSecurityKey(keyBytes);
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha512);

            var token = new JwtSecurityToken(_config.Issuer,
              null,
              new List<Claim>()
              {
                  new Claim("userId",       user.Id.ToString()),
                  new Claim("username",     user.Username),
                  new Claim("userPermission",  ((int)user.Permissions).ToString())
              },
              expires: DateTime.UtcNow.Add(_config.AccessTokenLifetime),
              signingCredentials: credentials);

            string writtenToken = new JwtSecurityTokenHandler().WriteToken(token);
            return writtenToken;
        }

        /// <summary>
        /// Generates a refresh token for a user
        /// </summary>
        /// <param name="user">The user to generate the token for</param>
        /// <param name="sessionId">The desired session id</param>
        /// <returns></returns>
        public string GenerateRefreshToken(User user, string sessionId)
        {
            var keyBytes = Convert.FromBase64String(_config.Secret);
            var securityKey = new SymmetricSecurityKey(keyBytes);
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha512);

            var token = new JwtSecurityToken(_config.Issuer,
              null,
              new List<Claim>()
              {
                  new Claim("userId", user.Id.ToString()),
                  new Claim("sessionId", sessionId)
              },
              expires: DateTime.UtcNow.Add(_config.RefreshTokenLifetime),
              signingCredentials: credentials);

            string writtenToken = new JwtSecurityTokenHandler().WriteToken(token);
            return writtenToken;
        }

        /// <summary>
        /// Validates a token and returns the principal
        /// </summary>
        /// <param name="token"></param>
        /// <returns></returns>
        public ClaimsPrincipal? ValidateToken(string token)
        {
            try
            {
                return new JwtSecurityTokenHandler().ValidateToken(token, GetValidationParameters(), out _);
            }
            catch (Exception)
            {
                return null;
            }
        }

        /// <summary>
        /// Cached token validation parameters
        /// </summary>
        private TokenValidationParameters? tokenValidationParameters;

        private TokenValidationParameters GetValidationParameters()
        {
            tokenValidationParameters ??= new()
                {
                    ValidateLifetime = true,
                    ValidateIssuer = true,
                    ValidateAudience = false,
                    ValidIssuer = _config.Issuer,
                    ClockSkew = TimeSpan.FromMilliseconds(0),
                    IssuerSigningKey = new SymmetricSecurityKey(Convert.FromBase64String(_config.Secret))
                };

            return tokenValidationParameters;
        }
    }
}
