using Core.Entities.Database;

namespace Api.Attributes
{
    [AttributeUsage(AttributeTargets.Method)]
    public class RateLimit : Attribute
    {
        public int MaxRequestsPerMinute { get; set; }
        public double SecondsBetweenRequests { get; private set; }
        public bool ApplyForWholeMinute { get; set; }

        public RateLimit(int maxRequestsPerMinute, bool fixedTimeFrame = true) 
        { 
            MaxRequestsPerMinute = maxRequestsPerMinute;
            SecondsBetweenRequests = 60f / MaxRequestsPerMinute;
            ApplyForWholeMinute = fixedTimeFrame;
        }
    }
}
