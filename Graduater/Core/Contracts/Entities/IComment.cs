using Core.Entities.Database;

namespace Core.Contracts.Entities
{
    public interface IComment
    {
        string Content { get; set; }
        DateTime DateCreated { get; set; }
        User User { get; set; }
        int UserId { get; set; }
    }
}