using Core.Entities.Database;

namespace Core.Contracts.Entities
{
    public interface IGroup
    {
        ICollection<Assignment>? Assignments { get; set; }
        User? CreatorUser { get; set; }
        int CreatorUserId { get; set; }
        string Description { get; set; }
        ICollection<GroupUser>? GroupUsers { get; set; }
        string Name { get; set; }
    }
}