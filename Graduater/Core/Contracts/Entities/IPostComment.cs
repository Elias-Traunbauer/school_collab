using Core.Entities.Database;

namespace Core.Contracts.Entities
{
    public interface IPostComment
    {
        Comment? Comment { get; set; }
        int CommentId { get; set; }
        Post? Post { get; set; }
        int PostId { get; set; }
    }
}