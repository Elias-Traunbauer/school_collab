using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Core.Contracts.Entities;

namespace Core.Entities.Database;

public class PostComment : DatabaseEntity, IPostComment
{
    public int PostId { get; set; }

    public int CommentId { get; set; }

    [ForeignKey(nameof(CommentId))]
    public virtual Comment? Comment { get; set; }

    [ForeignKey(nameof(PostId))]
    public virtual Post? Post { get; set; }
}
