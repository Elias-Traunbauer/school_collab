namespace Core.Contracts.Services
{
    public interface IRandomKeyService
    {
        string GetRandomKey(int length);
    }
}