using Api.Attributes;
using Api.Helpers;
using Core.Contracts.Services;
using Core.Entities.Database;
using Microsoft.IdentityModel.Tokens;
using Persistence;
using System.Diagnostics;
using System.Reflection;
using System.Security.Claims;

namespace Ribbon.API.Middlewares
{
    public class ExceptionHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ApiConfig _config;

        public ExceptionHandlingMiddleware(RequestDelegate next, ApiConfig configuration)
        {
            _next = next;
            _config = configuration;
        }

        public async Task Invoke(HttpContext httpContext)
        {
            try
            {
                await _next(httpContext);
            }
            catch (Exception ex)
            {
                if (httpContext.Response.HasStarted)
                {
                    return;
                }

                httpContext.Response.Clear();
                httpContext.Response.StatusCode = 500;
                httpContext.Response.ContentType = "application/json";
                var st = new StackTrace(ex, true);
                await httpContext.Response.WriteAsJsonAsync(new 
                {
                    StatusCode = 500,
                    message = ex.Message,
                    exceptionType = ex.GetType().Name,
                    innerExceptionType = ex.InnerException?.GetType().Name,
                    DeveloperInfo = new
                    {
                        File = st.GetFrame(0)?.GetFileName(),
                        Method = st.GetFrame(0)?.GetMethod()?.Name,
                        Line = st.GetFrame(0)?.GetFileLineNumber(),
                        StackTrace = st.ToString()
                    }
                });

                return;
            }
        }
    }

    // Extension method used to add the middleware to the HTTP request pipeline.
    public static class ExceptionHandlingMiddlewareExtensions
    {
        public static IApplicationBuilder UseCustomExceptionHandling(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<ExceptionHandlingMiddleware>();
        }
    }
}