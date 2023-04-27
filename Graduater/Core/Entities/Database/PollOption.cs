using Core.Contracts.Entities;
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