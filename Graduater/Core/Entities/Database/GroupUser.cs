using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Core.Contracts.Entities;

namespace Core.Entities.Database;

public class GroupUser : DatabaseEntity, IGroupUser
{
    [ForeignKey(nameof(GroupId))]
    public virtual Group Group { get; set; } = new();

    [ForeignKey(nameof(UserId))]
    public virtual User User { get; set; } = new();

    public int GroupId { get; set; }

    public int UserId { get; set; }
}
