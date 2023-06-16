using Core.Contracts.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities.Database;

public class ChatMember : DatabaseEntity, IChatMember
{
    public int ChatId { get; set; }

    public int UserId { get; set; }

    [ForeignKey(nameof(ChatId))]
    public virtual Chat? Chat { get; set; }

    [ForeignKey(nameof(UserId))]
    public virtual User? User { get; set; }
}