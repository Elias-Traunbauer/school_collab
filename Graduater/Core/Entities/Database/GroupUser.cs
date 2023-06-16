using Core.Contracts.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities.Database;

public class GroupUser : DatabaseEntity, IGroupUser
{
    [ForeignKey(nameof(GroupId))]
    public virtual Group? Group { get; set; }

    [ForeignKey(nameof(UserId))]
    public virtual User? User { get; set; }

    public int GroupId { get; set; }

    public int UserId { get; set; }
}