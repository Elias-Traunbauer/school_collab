namespace Core.Contracts.Services
{
    public interface IPasswordService
    {
        string HashPassword(string password, string salt);
    }
}