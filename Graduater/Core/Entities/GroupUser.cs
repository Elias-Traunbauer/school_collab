using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities;

public partial class GroupUser
{
    [ForeignKey(nameof(Group))]
    public virtual Group Group { get; set; } = new();

    [ForeignKey(nameof(User))]
    public virtual User User { get; set; } = new();

    public int GroupId { get; set; }

    public int UserId { get; set; }
}
