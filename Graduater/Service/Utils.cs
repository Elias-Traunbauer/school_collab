using System.Security.Cryptography;
using System.Text;

namespace Persistence
{
    public static class Utils
    {
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
}