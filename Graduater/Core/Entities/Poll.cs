using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities;

public class Poll : DatabaseEntity
{
    public string Title { get; set; } = null!;

    public string Description { get; set; } = null!;

    public int CreatorUserId { get; set; }

    public DateTime Due { get; set; }

    public DateTime DateCreated { get; set; }

    public bool IsAnonymous { get; set; }

    [ForeignKey(nameof(CreatorUserId))]
    public virtual User CreatorUser { get; set; } = null!;

    public virtual ICollection<PollOption> PollOptions { get; set; } = new List<PollOption>();
}
