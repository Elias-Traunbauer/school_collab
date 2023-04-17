using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities;

public class ChatMember : DatabaseEntity
{
    public int ChatId { get; set; }

    public int UserId { get; set; }

    [ForeignKey(nameof(ChatId))]
    public virtual Chat Chat { get; set; } = null!;

    [ForeignKey(nameof(UserId))]
    public virtual User User { get; set; } = null!;
}
