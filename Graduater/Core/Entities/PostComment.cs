using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities;

public class PostComment : DatabaseEntity
{
    public int PostId { get; set; }

    public int CommentId { get; set; }

    [ForeignKey(nameof(CommentId))]
    public virtual Comment Comment { get; set; } = null!;

    [ForeignKey(nameof(PostId))]
    public virtual Post Post { get; set; } = null!;
}
