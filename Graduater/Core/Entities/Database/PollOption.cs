using Core.Contracts.Entities;
using Core.Contracts.Services;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities.Database;

public class PollOption : DatabaseEntity, IPollOption
{
    public int PollId { get; set; }

    public string Name { get; set; } = null!;

    public int Votes { get; set; }

    [ForeignKey(nameof(PollId))]
    public virtual Poll? Poll { get; set; }
}

public class PollOptionUpdatePayload : IConvertible<PollOption>
{
    public int? Id { get; set; }
    public int PollId { get; set; }
    public string Name { get; set; } = null!;
    public Guid Version { get; set; }

    public PollOption Convert()
    {
        return new PollOption
        {
            Id = Id ?? 0,
            PollId = PollId,
            Version = Version,
            Name = Name
        };
    }
}

public class PollOptionCreatePayload : IConvertible<PollOption>
{
    public string Name { get; set; } = null!;

    public PollOption Convert()
    {
        return new PollOption
        {
            Name = Name
        };
    }
}