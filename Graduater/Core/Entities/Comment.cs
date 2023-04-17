using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities;

public class Comment : DatabaseEntity
{
    public int UserId { get; set; }

    public string Content { get; set; } = null!;

    public DateTime DateCreated { get; set; }

    [ForeignKey(nameof(UserId))]
    public virtual User User { get; set; } = null!;
}
