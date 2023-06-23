using Core.Contracts.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities.Database;

public class Group : DatabaseEntity, IGroup
{
    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public int CreatorUserId { get; set; }

    [ForeignKey(nameof(CreatorUserId))]
    public virtual User? CreatorUser { get; set; }

    public virtual ICollection<GroupUser>? GroupUsers { get; set; }
}