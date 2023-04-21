using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Core.Contracts.Entities;

namespace Core.Entities.Database;

public class Comment : DatabaseEntity, IComment
{
    public int UserId { get; set; }

    public string Content { get; set; } = string.Empty;

    public DateTime DateCreated { get; set; }

    [ForeignKey(nameof(UserId))]
    public virtual User? User { get; set; }
}
