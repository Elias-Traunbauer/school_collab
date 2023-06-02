namespace Core.Contracts.Models
{
    public interface IAssignmentPostPayload
    {
        string Title { get; set; }
        string Description { get; set; }
        string Content { get; set; }
        DateTime Due { get; set; }
        int GroupId { get; set; }
        int SubjectId { get; set; }
    }
}