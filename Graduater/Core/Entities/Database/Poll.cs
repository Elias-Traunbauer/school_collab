using Core.Contracts.Entities;
using Core.Contracts.Services;
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

public class PollUpdatePayload : IConvertible<Poll>
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;

    public string Description { get; set; } = null!;

    public int CreatorUserId { get; set; }

    public DateTime Due { get; set; }

    public List<PollOptionUpdatePayload> PollOptions { get; set; } = null!;

    public bool IsAnonymous { get; set; }
    public Guid Version { get; set; }

    public Poll Convert()
    {
        return new Poll
        {
            Id = Id,
            Title = Title,
            Description = Description,
            CreatorUserId = CreatorUserId,
            Due = Due,
            IsAnonymous = IsAnonymous,
            Version = Version,
            PollOptions = PollOptions.Select(x => x.Convert()).ToList()
        };
    }
}

public class PollCreatePayload : IConvertible<Poll>
{
    public string Title { get; set; } = null!;

    public string Description { get; set; } = null!;

    public int CreatorUserId { get; set; }

    public DateTime Due { get; set; }

    public bool IsAnonymous { get; set; }

    public List<PollOptionCreatePayload> PollOptions { get; set; } = null!;

    public Poll Convert()
    {
        return new Poll
        {
            Title = Title,
            Description = Description,
            CreatorUserId = CreatorUserId,
            Due = Due,
            IsAnonymous = IsAnonymous,
            PollOptions = PollOptions.Select(x => x.Convert()).ToList()
        };
    }
}
