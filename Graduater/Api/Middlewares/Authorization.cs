using Api.Helpers;
using Core.Entities.Database;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Persistence;
using Ribbon.API.Attributes;
using System.Threading.Tasks;

namespace Api.Middlewares
{
    public class UserAuthorizationMiddleware
    {
        private readonly RequestDelegate _next;

        private readonly ApiConfig _config;

        public UserAuthorizationMiddleware(RequestDelegate next, ApiConfig config)
        {
            _next = next;
            _config = config;
        }

        public async Task Invoke(HttpContext httpContext)
        {
            var targetEndpoint = httpContext.GetEndpoint();
            EndpointPermission? permissionAttribute = (EndpointPermission?)(targetEndpoint?.Metadata.FirstOrDefault(x => x is EndpointPermission, null));

            if (targetEndpoint != null && permissionAttribute != null)
            {
                var requstUserInfo = httpContext.GetUserInfo();

                if (requstUserInfo.Authenticated)
                {
                    UserPermission userPerms = requstUserInfo.User!.Permissions;
                    if ((userPerms & permissionAttribute.Required) != 0 && (userPerms & UserPermission.Disabled) == 0)
                    {
                        await _next(httpContext);
                        return;
                    }
                }

                httpContext.Response.StatusCode = 403;
                await httpContext.Response.WriteAsJsonAsync(new
                {
                    Status = 403
                });
                return;
            }

            await _next(httpContext);
        }
    }

    // Extension method used to add the middleware to the HTTP request pipeline.
    public static class AuthorizationExtensions
    {
        public static IApplicationBuilder UseUserAuthorization(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<UserAuthorizationMiddleware>();
        }
    }
}
