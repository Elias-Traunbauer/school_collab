using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities;

public class Post : DatabaseEntity
{
    public int UserId { get; set; }

    public string Title { get; set; } = null!;

    public string Content { get; set; } = null!;

    public DateTime DateCreated { get; set; }

    public virtual ICollection<PostComment> PostComments { get; set; } = new List<PostComment>();

    [ForeignKey(nameof(UserId))]
    public virtual User User { get; set; } = null!;
}
