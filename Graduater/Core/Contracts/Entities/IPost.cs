using Core.Entities.Database;

namespace Core.Contracts.Entities
{
    public interface IPost
    {
        string Content { get; set; }
        DateTime DateCreated { get; set; }
        ICollection<PostComment> PostComments { get; set; }
        string Title { get; set; }
        User User { get; set; }
        int UserId { get; set; }
    }
}