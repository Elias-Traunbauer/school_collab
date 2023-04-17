using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities;

public partial class Comment
{
    public int UserId { get; set; }

    public string Content { get; set; } = null!;

    public DateTime DateCreated { get; set; }

    [ForeignKey(nameof(UserId))]
    public virtual User User { get; set; } = null!;
}
