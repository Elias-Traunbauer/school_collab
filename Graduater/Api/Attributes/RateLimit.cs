namespace Api.Attributes
{
    [AttributeUsage(AttributeTargets.Method)]
    public class RateLimitAttribute : Attribute
    {
        public int MaxRequestsPerMinute { get; set; }
        public double MilisecondsBetweenRequests { get; private set; }
        public RateLimitMode Mode { get; set; }

        public RateLimitAttribute(int maxRequestsPerMinute, RateLimitMode rateLimitMode = RateLimitMode.SlidingTimeWindow)
        {
            MaxRequestsPerMinute = maxRequestsPerMinute;
            MilisecondsBetweenRequests = 60_000d / MaxRequestsPerMinute;
            Mode = rateLimitMode;
        }
    }

    public enum RateLimitMode
    {
        SlidingTimeWindow,
        FixedDelay
    }
}