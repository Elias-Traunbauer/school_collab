using Core.Contracts.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities.Database;

public class Poll : DatabaseEntity, IPoll
{
    public string Title { get; set; } = null!;

    public string Description { get; set; } = null!;

    public int CreatorUserId { get; set; }

    public DateTime Due { get; set; }

    public DateTime DateCreated { get; set; }

    public bool IsAnonymous { get; set; }

    [ForeignKey(nameof(CreatorUserId))]
    public virtual User? CreatorUser { get; set; }

    public virtual ICollection<PollOption>? PollOptions { get; set; }
}