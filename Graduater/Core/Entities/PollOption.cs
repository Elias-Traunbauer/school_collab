using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities;

public class PollOption : DatabaseEntity
{
    public int PollId { get; set; }

    public string Name { get; set; } = null!;

    public int Votes { get; set; }

    [ForeignKey(nameof(PollId))]
    public virtual Poll Poll { get; set; } = null!;
}
