using Api.Attributes;
using Api.Helpers;
using Core.Contracts.Services;
using Core.Entities.Database;
using Microsoft.IdentityModel.Tokens;
using Persistence;
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
            bool noAuthNeeded = false;
            if (endpoint != null)
            {
                if (endpoint.Metadata.Any(x => x is NoAuthenticationRequired))
                {
                    await _next(httpContext);
                    return;
                }
                if (endpoint.Metadata.Any(x => x is AuthenticationOptionalAttribute))
                {
                    noAuthNeeded = true;
                }
            }

            httpContext.Items[nameof(HttpContextUserInfo)] = new HttpContextUserInfo();

            string? accessToken = httpContext.Request.Cookies[_config.AccessTokenCookieIdentifier];
            string? refreshTokenTemp = httpContext.Request.Cookies[_config.RefreshTokenCookieIdentifier];
            ClaimsPrincipal? refreshClaims = null;
            if (refreshTokenTemp != null)
            {
                refreshClaims = jsonWebTokenService.ValidateToken(refreshTokenTemp);
            }

            if (accessToken != null)
            {
                var claims = jsonWebTokenService.ValidateToken(accessToken);

                if (claims != null)
                {
                    SetUserData(httpContext, claims, refreshClaims!.Claims.Single(x => x.Type == "sessionId").Value);
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

                        SetUserData(httpContext, newClaims!, refreshClaims!.Claims.Single(x => x.Type == "sessionId").Value);
                        await _next(httpContext);
                        return;
                    }
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
            else if (!httpContext.GetUserInfo().Authenticated && !noAuthNeeded)
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

        private static void SetUserData(HttpContext httpContext, ClaimsPrincipal claims, string sessionId)
        {
            HttpContextUserInfo httpContextUserInfo = new();
            httpContextUserInfo.SessionId = sessionId;
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