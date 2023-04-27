using Api.Attributes;
using Api.Helpers;
using Core.Entities.Database;

namespace Api.Middlewares
{
    public class UserAuthorizationMiddleware
    {
        private readonly RequestDelegate _next;

        public UserAuthorizationMiddleware(RequestDelegate next)
        {
            _next = next;
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
                    UserPermission userPerms = requstUserInfo.User!.Permissions; // check if user is disabled
                    if ((userPerms & permissionAttribute.Required) != 0 && (userPerms & UserPermission.Disabled) == 0)
                    {
                        await _next(httpContext);
                        return;
                    }
                }

                // forbidden
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