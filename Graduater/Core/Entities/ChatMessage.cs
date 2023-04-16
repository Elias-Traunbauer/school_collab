using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities;

public partial class ChatMessage
{
    public int ChatId { get; set; }

    public int UserId { get; set; }

    public string Content { get; set; } = null!;

    public DateTime Created { get; set; }

    [ForeignKey(nameof(ChatId))]
    public virtual Chat Chat { get; set; } = null!;

    [ForeignKey(nameof(UserId))]
    public virtual User User { get; set; } = null!;
}
