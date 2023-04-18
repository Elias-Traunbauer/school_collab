using Core.Entities.Database;

namespace Core.Contracts.Entities
{
    public interface IChatMember
    {
        Chat Chat { get; set; }
        int ChatId { get; set; }
        User User { get; set; }
        int UserId { get; set; }
    }
}