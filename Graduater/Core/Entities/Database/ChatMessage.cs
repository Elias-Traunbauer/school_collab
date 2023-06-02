using Core.Contracts.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities.Database;

public class ChatMessage : DatabaseEntity, IChatMessage
{
    public int ChatId { get; set; }

    public int UserId { get; set; }

    public string Content { get; set; } = null!;

    public DateTime Created { get; set; }

    [ForeignKey(nameof(ChatId))]
    public virtual Chat? Chat { get; set; }

    [ForeignKey(nameof(UserId))]
    public virtual User? User { get; set; }
}