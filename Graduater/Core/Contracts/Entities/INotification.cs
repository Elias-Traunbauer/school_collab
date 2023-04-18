using Core.Entities.Database;

namespace Core.Contracts.Entities
{
    public interface INotification
    {
        string Content { get; set; }
        DateTime Created { get; set; }
        bool IsRead { get; set; }
        string Link { get; set; }
        User User { get; set; }
        int UserId { get; set; }
    }
}