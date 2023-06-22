using Core.Entities.Database;

namespace Core.Contracts.Entities
{
    public interface IAssignment
    {
        string Content { get; set; }
        DateTime Created { get; set; }
        string Description { get; set; }
        DateTime Due { get; set; }
        List<Core.Entities.Database.File>? Files { get; set; }
        Group Group { get; set; }
        int GroupId { get; set; }
        DateTime Modified { get; set; }
        Subject Subject { get; set; }
        int SubjectId { get; set; }
        string Title { get; set; }
        User? User { get; set; }
        int UserId { get; set; }
    }
}