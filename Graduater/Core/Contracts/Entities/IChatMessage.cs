using Core.Entities.Database;

namespace Core.Contracts.Entities
{
    public interface IChatMessage
    {
        Chat? Chat { get; set; }
        int ChatId { get; set; }
        string Content { get; set; }
        DateTime Created { get; set; }
        User? User { get; set; }
        int UserId { get; set; }
    }
}