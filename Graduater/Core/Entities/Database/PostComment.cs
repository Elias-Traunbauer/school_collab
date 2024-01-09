using Core.Contracts.Entities;
using System.ComponentModel.DataAnnotations.Schema;

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