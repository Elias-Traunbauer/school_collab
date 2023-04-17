using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities;

public class GroupUser : DatabaseEntity
{
    [ForeignKey(nameof(GroupId))]
    public virtual Group Group { get; set; } = new();

    [ForeignKey(nameof(UserId))]
    public virtual User User { get; set; } = new();

    public int GroupId { get; set; }

    public int UserId { get; set; }
}
