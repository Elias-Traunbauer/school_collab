using Core.Entities;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace Api.Helpers
{
    public static class HttpContextHelper
    {
        public static HttpContextUserInfo GetUserInfo(this HttpContext httpContext)
        {
            if (httpContext.Items[nameof(HttpContextUserInfo)] == null)
            {
                throw new ArgumentException("Authentication required");
            }

            return (HttpContextUserInfo)httpContext.Items[nameof(HttpContextUserInfo)]!;
        }

        public static string RandomCharSequence(int randomBytesCount = 128)
        {
            var bytes = RandomNumberGenerator.GetBytes(randomBytesCount);
            var hashValue = SHA512.HashData(bytes);
            StringBuilder stringBuilder = new();
            foreach (byte b in hashValue)
            {
                stringBuilder.Append($"{b:X2}");
            }
            return stringBuilder.ToString();
        }
    }

    public class HttpContextUserInfo
    {
        public bool Authenticated => User != null;
        public User? User { get; set; }
    }
}
