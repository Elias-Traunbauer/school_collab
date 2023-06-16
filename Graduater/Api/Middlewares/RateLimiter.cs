using Api.Attributes;
using Api.Helpers;
using System.Collections.Concurrent;

namespace Api.Middlewares;

public class RateLimitMiddleware
{
    private record struct ClientFingerprint(string RemoteIp, string UserAgent, string? XForwardedFor, int? userId);

    // Dictionary of client fingerprints to their respective Dictionaries for rate limiting
    private readonly Dictionary<ClientFingerprint, ConcurrentDictionary<string, ConcurrentQueue<long>>> _requests;

    private readonly RequestDelegate _next;

    public RateLimitMiddleware(RequestDelegate next)
    {
        _next = next;
        _requests = new Dictionary<ClientFingerprint, ConcurrentDictionary<string, ConcurrentQueue<long>>>();
    }

    public async Task Invoke(HttpContext context)
    {
        var endpoint = context.GetEndpoint();

        if (endpoint == null)
        {
            context.Response.StatusCode = 404;
            return;
        }

        var endpointIdentifier = context.Request.Path.ToString() + " / " + context.Request.Method;

        RateLimitAttribute? rateLimit = endpoint.Metadata.GetMetadata<RateLimitAttribute>();

        if (rateLimit == null)
        {
            await _next(context);
            return;
        }

        string? ip = context.Connection.RemoteIpAddress?.ToString();
        string? userAgent = context.Request.Headers.UserAgent;
        string? xForwardedFor = context.Request.Headers["X-Forwarded-For"];

        if (ip == null || userAgent == null)
        {
            // i will pose as a teapot if the client thinks he wants to trick me
            context.Response.StatusCode = 418;

            // output a small nice text about me being a teapot
            await context.Response.WriteAsJsonAsync(
                new
                {
                    Message = "I am the mighty teapot!" + "\n" +
                              "I am not a coffee machine, I am not a server, I am a teapot!" + "\n" +
                              "I will not serve you coffee, I will not serve you tea, I will not serve you anything!" + "\n" +
                              "I am a teapot!" + "\n\n" +
                              "Actually... I didn't find your UserAgent or your IP..."
                });

            return;
        }
        var userInfo = context.GetUserInfo();

        ClientFingerprint clientFingerprint = new(ip!, userAgent!, xForwardedFor, userInfo.User?.Id);

        // initialize requests queue for new IP addresses
        if (!_requests.ContainsKey(clientFingerprint))
        {
            _requests[clientFingerprint] = new ConcurrentDictionary<string, ConcurrentQueue<long>>();
        }

        if (!_requests[clientFingerprint].ContainsKey(endpointIdentifier))
        {
            _requests[clientFingerprint][endpointIdentifier] = new ConcurrentQueue<long>();
        }
        var endpointQueue = _requests[clientFingerprint][endpointIdentifier];

        var now = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
        var oneMinuteAgo = now - 60_000;
        var lastRequestMinimumAgo = now - rateLimit.MilisecondsBetweenRequests;

        // remove expired requests from the queue
        if (!endpointQueue.IsEmpty)
        {
            endpointQueue.TryPeek(out var request);
            while (!endpointQueue.IsEmpty && (rateLimit.Mode == RateLimitMode.SlidingTimeWindow ? request < oneMinuteAgo : request < lastRequestMinimumAgo))
            {
                endpointQueue.TryDequeue(out _);
            }
        }

        // calculate time until rate limit is reset
        endpointQueue.TryPeek(out var lastRequest);
        var resetTime = rateLimit.Mode == RateLimitMode.SlidingTimeWindow ? lastRequest + 60_000 : lastRequest + rateLimit.MilisecondsBetweenRequests;

        // check if the rate limit has been exceeded
        if (endpointQueue.Count >= (rateLimit.Mode == RateLimitMode.SlidingTimeWindow ? rateLimit.MaxRequestsPerMinute : 1))
        {
            context.Response.StatusCode = StatusCodes.Status429TooManyRequests;
            await context.Response.WriteAsJsonAsync(new
            {
                Error = "Rate limit exceeded",
                TryAgainIn = resetTime - now
            });
            return;
        }

        // add the current request to the queue
        endpointQueue.Enqueue(now);

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