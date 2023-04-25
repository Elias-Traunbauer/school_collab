using Api.Attributes;
using Api.Helpers;
using Core.Contracts;
using Core.Contracts.Services;
using Core.Entities.Database;
using Microsoft.IdentityModel.Tokens;
using MySqlX.XDevAPI.Common;
using Org.BouncyCastle.Asn1.Cms;
using Persistence;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Ribbon.API.Middlewares
{
    public class UserAuthenticationMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ApiConfig _config;

        public UserAuthenticationMiddleware(RequestDelegate next, ApiConfig configuration)
        {
            _next = next;
            _config = configuration;
        }

        public async Task Invoke(HttpContext httpContext, IJsonWebTokenService jsonWebTokenService, IUserService userService)
        {
            var endpoint = httpContext.GetEndpoint();

            if (endpoint != null)
            {
                if (endpoint.Metadata.Any(x => x is NoAuthenticationRequired))
                {
                    await _next(httpContext);
                    return;
                }
            }

            httpContext.Items[nameof(HttpContextUserInfo)] = new HttpContextUserInfo();

            string? accessToken = httpContext.Request.Cookies[_config.AccessTokenCookieIdentifier];
            if (accessToken != null)
            {
                var claims = jsonWebTokenService.ValidateToken(accessToken);

                if (claims != null)
                {
                    SetUserData(httpContext, claims);
                }
            }

            string? refreshToken = httpContext.Request.Cookies[_config.RefreshTokenCookieIdentifier];
            if (refreshToken != null && !httpContext.GetUserInfo().Authenticated)
            {
                try
                {
                    var claims = jsonWebTokenService.ValidateToken(refreshToken);

                    if (claims != null)
                    {
                        int userId = int.Parse(claims.Claims.Single(x => x.Type == "userId").Value);
                        string sessionId = claims.Claims.Single(x => x.Type == "sessionId").Value;

                        var useRefreshTokenResult = await userService.UseRefreshTokenAsync(userId, sessionId);

                        if (useRefreshTokenResult.Status != 200)
                        {
                            httpContext.Response.StatusCode = 401;
                            await httpContext.Response.WriteAsJsonAsync(new
                            {
                                Status = 401
                            });
                            return;
                        }
                        httpContext.Response.SetCookie(_config.AccessTokenCookieIdentifier, useRefreshTokenResult.Value!, DateTime.Now.Add(_config.AccessTokenLifetime));

                        var newClaims = jsonWebTokenService.ValidateToken(useRefreshTokenResult.Value!);

                        SetUserData(httpContext, newClaims!);
                        await _next(httpContext);
                        return;
                    }

                    //if (res != null)
                    //{
                    //    var refreshTokenTimeLeft = refreshJwt.ValidTo - DateTime.UtcNow;
                    //    if (refreshTokenTimeLeft.Add(TimeSpan.FromMinutes(-1)) < _config.AccessTokenLifetime)
                    //    {
                    //        var newRefreshToken = await uow.UserRepository.RegenerateRefreshToken(userId, sessionId);

                    //        if (newRefreshToken != null)
                    //        {
                    //            httpContext.Response.SetCookie(_config.RefreshTokenCookieIdentifier, newRefreshToken, DateTime.Now.Add(_config.RefreshTokenLifetime));
                    //        }
                    //    }
                    //    SetUserData(httpContext, accessJwt);
                    //    await uow.SaveChangesAsync();
                    //    await _next(httpContext);
                    //    return;
                    //}
                    //else
                    //{
                    //    httpContext.Response.StatusCode = 401;
                    //    await httpContext.Response.WriteAsJsonAsync(new
                    //    {
                    //        Status = 401
                    //    });
                    //    return;
                    //}
                }
                catch
                {
                    httpContext.Response.StatusCode = 401;
                    await httpContext.Response.WriteAsJsonAsync(new
                    {
                        Status = 401
                    });
                    return;
                }
                finally { }
            }
            else if (!httpContext.GetUserInfo().Authenticated)
            {
                httpContext.Response.StatusCode = 401;
                await httpContext.Response.WriteAsJsonAsync(new
                {
                    Status = 401
                });
                return;
            }

            await _next(httpContext);
            return;
        }

        private static void SetUserData(HttpContext httpContext, ClaimsPrincipal claims)
        {
            HttpContextUserInfo httpContextUserInfo = new();
            int userId = int.Parse(claims.Claims.Single(x => x.Type == "userId").Value);
            string username = claims.Claims.Single(x => x.Type == "username").Value;
            UserPermission userPermission = (UserPermission)int.Parse(claims.Claims.Single(x => x.Type == "userPermission").Value);

            httpContextUserInfo.User = new User()
            {
                Id = userId,
                Username = username,
                Permissions = userPermission
            };
            httpContext.Items[nameof(HttpContextUserInfo)] = httpContextUserInfo;
        }

        private TokenValidationParameters GetValidationParameters()
        {
            return new TokenValidationParameters()
            {
                ValidateLifetime = true,
                ValidateIssuer = true,
                ValidateAudience = false,
                ValidIssuer = _config.Issuer,
                ClockSkew = TimeSpan.FromMilliseconds(0),
                IssuerSigningKey = new SymmetricSecurityKey(Convert.FromBase64String(_config.Secret))
            };
        }
    }

    // Extension method used to add the middleware to the HTTP request pipeline.
    public static class AuthentificationExtensions
    {
        public static IApplicationBuilder UseUserAuthentication(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<UserAuthenticationMiddleware>();
        }
    }
}
