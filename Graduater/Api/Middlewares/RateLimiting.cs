using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Attributes;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Api.Middlewares;

public class RateLimitMiddleware
{
    private record struct ClientFingerprint(string RemoteIp, string UserAgent, string? XForwardedFor);

    // Dictionary of client fingerprints to their respective Dictionaries for rate limiting
    private readonly Dictionary<ClientFingerprint, ConcurrentDictionary<string, Queue<long>>> _requests;
    private readonly ApiConfig _config;
    private readonly RequestDelegate _next;

    public RateLimitMiddleware(RequestDelegate next, ApiConfig config)
    {
        _config = config;
        _next  = next;
        _requests = new Dictionary<ClientFingerprint, ConcurrentDictionary<string, Queue<long>>>();
    }

    public async Task Invoke(HttpContext context)
    {
        var endpoint = context.GetEndpoint();

        if (endpoint == null)
        {
            context.Response.StatusCode = 404;
            return;
        }

        if (!endpoint.Metadata.Any(x => x is RateLimit))
        {
            return;
        }

        RateLimit rateLimit = (RateLimit)endpoint.Metadata.Single(x => x is RateLimit);

        string? ip = context.Connection.RemoteIpAddress?.ToString();
        string? userAgent = context.Request.Headers.UserAgent;
        string? xForwardedFor = context.Request.Headers["X-ForwardedFor"];

        if (ip == null || userAgent == null)
        {
            // i will pose as a teapot if the client thinks he wants to trick me
            context.Response.StatusCode = 418;
            return;
        }
        ClientFingerprint clientFingerprint = new(ip!, userAgent!, xForwardedFor);
        
        // initialize requests queue for new IP addresses
        if (!_requests.ContainsKey(clientFingerprint))
        {
            _requests[clientFingerprint] = new ConcurrentDictionary<string, Queue<long>>();
        }

        if (!_requests[clientFingerprint].ContainsKey(endpoint.DisplayName))
        {
            _requests[clientFingerprint][endpoint.DisplayName] = new Queue<long>();
        }

        var now = DateTimeOffset.UtcNow.ToUnixTimeSeconds();

        // remove expired requests from the queue
        while (_requests[clientFingerprint][endpoint.DisplayName].Count > 0 && _requests[clientFingerprint][endpoint.DisplayName].Peek() < now - 60)
        {
            _requests[clientFingerprint][endpoint.DisplayName].Dequeue();
        }

        // check if the rate limit has been exceeded
        if (_requests[clientFingerprint][endpoint.DisplayName].Count >= rateLimit.MaxRequestsPerMinute)
        {
            context.Response.StatusCode = StatusCodes.Status429TooManyRequests;
            await context.Response.WriteAsJsonAsync(new
            {
                Error = "Rate limit exceeded, try again soon"
            });
            return;
        }

        // add the current request to the queue
        _requests[clientFingerprint][endpoint.DisplayName].Enqueue(now);

        // invoke the next middleware in the pipeline
        await _next(context);
    }
}

public static class RateLimitMiddlewareExtensions
{
    public static IApplicationBuilder UseRateLimiting(this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<RateLimitMiddleware>();
    }
}