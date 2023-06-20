using Core.Contracts.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities.Database;

public class Assignment : DatabaseEntity, IAssignment
{
    public string Title { get; set; } = null!;

    public string Description { get; set; } = null!;

    public string Content { get; set; } = null!;

    public DateTime Created { get; set; }

    public DateTime Modified { get; set; }

    public DateTime Due { get; set; }

    public virtual List<File>? Files { get; set; }
    public virtual List<File>? Instructions { get; set; }

    [ForeignKey(nameof(GroupId))]
    public virtual Group Group { get; set; } = null!;

    [ForeignKey(nameof(SubjectId))]
    public virtual Subject Subject { get; set; } = null!;

    [ForeignKey(nameof(UserId))]
    public virtual User User { get; set; } = null!;

    public int UserId { get; set; }

    public int GroupId { get; set; }

    public int SubjectId { get; set; }
}