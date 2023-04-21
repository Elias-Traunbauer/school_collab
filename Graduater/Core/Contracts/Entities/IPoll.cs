using Core.Entities.Database;

namespace Core.Contracts.Entities
{
    public interface IPoll
    {
        User? CreatorUser { get; set; }
        int CreatorUserId { get; set; }
        DateTime DateCreated { get; set; }
        string Description { get; set; }
        DateTime Due { get; set; }
        bool IsAnonymous { get; set; }
        ICollection<PollOption>? PollOptions { get; set; }
        string Title { get; set; }
    }
}