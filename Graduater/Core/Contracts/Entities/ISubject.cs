using Core.Entities.Database;

namespace Core.Contracts.Entities
{
    public interface ISubject
    {
        ICollection<Assignment>? Assignments { get; set; }
        string Name { get; set; }
    }
}