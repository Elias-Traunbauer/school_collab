using Core.Entities.Database;

namespace Core.Contracts.Entities
{
    public interface IChat
    {
        ICollection<ChatMember> ChatMembers { get; set;  }
        ICollection<ChatMessage> ChatMessages { get; set; }
        User? CreatorUser { get; set; }
        int CreatorUserId { get; set; }
        string Description { get; set; }
        string Name { get; set; }
    }
}