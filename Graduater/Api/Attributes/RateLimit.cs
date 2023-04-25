using Core.Entities.Database;

namespace Api.Attributes
{
    [AttributeUsage(AttributeTargets.Method)]
    public class RateLimit : Attribute
    {
        public int MaxRequestsPerMinute { get; set; }
        public double SecondsBetweenRequests { get; private set; }
        public RateLimitMode Mode { get; set; }

        public RateLimit(int maxRequestsPerMinute, RateLimitMode rateLimitMode = RateLimitMode.SlidingTimeWindow) 
        { 
            MaxRequestsPerMinute = maxRequestsPerMinute;
            SecondsBetweenRequests = 60f / MaxRequestsPerMinute;
            Mode = rateLimitMode;
        }

    }

    public enum RateLimitMode
    {
        SlidingTimeWindow,
        FixedDelay
    }
}
