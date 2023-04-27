using Core.Contracts.Entities;

namespace Core.Entities.Database;

public class Subject : DatabaseEntity, ISubject
{
    public string Name { get; set; } = null!;

    public virtual ICollection<Assignment>? Assignments { get; set; }
}