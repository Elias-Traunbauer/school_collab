using Core.Contracts.Entities;
using Core.Contracts.Services;
using System.ComponentModel.DataAnnotations.Schema;
using System.Web.Razor.Generator;

namespace Core.Entities.Database;

public class Assignment : DatabaseEntity, IAssignment
{
    public string Title { get; set; } = null!;

    public string Description { get; set; } = null!;

    public string Content { get; set; } = null!;

    public DateTime Created { get; set; }

    public DateTime Modified { get; set; }

    public DateTime Due { get; set; }

    [ForeignKey(nameof(AssignmentFile.AssignmentId))]
    public virtual ICollection<AssignmentFile>? Files { get; set; }

    [ForeignKey(nameof(GroupId))]
    public virtual Group? Group { get; set; } = null!;

    [ForeignKey(nameof(SubjectId))]
    public virtual Subject? Subject { get; set; } = null!;

    [ForeignKey(nameof(UserId))]
    public virtual User? User { get; set; } = null!;

    public int UserId { get; set; }

    public int GroupId { get; set; }

    public int SubjectId { get; set; }
}

public class AssignmentUpdatePayload : IConvertible<Assignment>
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;

    public string Description { get; set; } = null!;

    public string Content { get; set; } = null!;

    public DateTime Created { get; set; }

    public DateTime Due { get; set; }

    public int GroupId { get; set; }

    public int SubjectId { get; set; }

    public int UserId { get; set; }

    public List<AssignmentFileUpdatePayload>? Files { get; set; }

    public Assignment Convert()
    {
        return new Assignment
        {
            Id = Id,
            Created = Created,
            Title = Title,
            Description = Description,
            Content = Content,
            Due = Due,
            GroupId = GroupId,
            UserId = UserId,
            SubjectId = SubjectId,
            Files = Files?.Select(x => x.Convert()).ToList()
        };
    }
}