using Core.Entities.Database;

namespace Core.Contracts.Entities
{
    public interface IGroupUser
    {
        Group? Group { get; set; }
        int GroupId { get; set; }
        User? User { get; set; }
        int UserId { get; set; }
    }
}