using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Core.Contracts.Entities;

namespace Core.Entities.Database;

public class PollOption : DatabaseEntity, IPollOption
{
    public int PollId { get; set; }

    public string Name { get; set; } = null!;

    public int Votes { get; set; }

    [ForeignKey(nameof(PollId))]
    public virtual Poll Poll { get; set; } = null!;
}
