using Core.Entities.Database;

namespace Api.Attributes
{
    [AttributeUsage(AttributeTargets.Method)]
    public class RateLimit : Attribute
    {
        public int MaxRequestsPerMinute { get; set; }
        public int MillisecondsBetweenRequests { get; private set; }

        public RateLimit(int maxRequestsPerMinute) 
        { 
            MaxRequestsPerMinute = maxRequestsPerMinute;
            MillisecondsBetweenRequests = 60 / MaxRequestsPerMinute;
        }
    }
}
