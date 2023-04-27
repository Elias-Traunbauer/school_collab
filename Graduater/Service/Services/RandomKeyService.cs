using Core.Contracts.Services;
using System.Security.Cryptography;

namespace Service.Services
{
    public class RandomKeyService : IRandomKeyService
    {
        public string GetRandomKey(int length)
        {
            // chars to bytes
            int randomByteCount = (int)Math.Floor(length * 6d / 8d);
            byte[] randomBytes = RandomNumberGenerator.GetBytes(randomByteCount);
            return Convert.ToBase64String(randomBytes);
        }
    }
}