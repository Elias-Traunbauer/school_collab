using Core.Entities;

namespace Core.Contracts.Entities
{
    public interface IUserSession
    {
        DateTime Expires { get; set; }
        string Ip { get; set; }
        DateTime IssuedAt { get; set; }
        DateTime LastAction { get; set; }
        string SessionKey { get; set; }
        User User { get; set; }
        int UserId { get; set; }
    }
}