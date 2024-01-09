using Core.Contracts.Services;
using System.Security.Cryptography;
using System.Text;

namespace Service.Services
{
    public class PasswordService : IPasswordService
    {
        public string HashPassword(string password, string salt)
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
    }
}