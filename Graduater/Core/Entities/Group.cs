using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities;

public partial class Group
{
    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public int CreatorUserId { get; set; }

    public virtual ICollection<Assignment> Assignments { get; set; } = new List<Assignment>();

    [ForeignKey(nameof(CreatorUserId))]
    public virtual User CreatorUser { get; set; } = new();

    public virtual ICollection<GroupUser> GroupUsers { get; set; } = new List<GroupUser>();
}
