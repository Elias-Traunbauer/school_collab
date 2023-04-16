using System;
using System.Collections.Generic;

namespace Core.Entities;

public partial class PostComment
{
    public int Id { get; set; }

    public int PostId { get; set; }

    public int CommentId { get; set; }

    public virtual Comment Comment { get; set; } = null!;

    public virtual Post Post { get; set; } = null!;
}
