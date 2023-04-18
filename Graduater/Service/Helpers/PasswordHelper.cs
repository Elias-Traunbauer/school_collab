using System.Security.Cryptography;
using System.Text;

namespace Service.Helpers
{
    public static class PasswordHelper
    {
        public static string HashPassword(string password, string salt)
        {
            var bytes = Encoding.UTF8.GetBytes(password + salt);
            var hashValue = SHA512.HashData(bytes);
            StringBuilder stringBuilder = new();
            foreach (byte b in hashValue)
            {
                stringBuilder.Append($"{b:X2}");
            }
            return stringBuilder.ToString();
        }

        public static string GenerateSalt()
        {
            var bytes = RandomNumberGenerator.GetBytes(128);
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
