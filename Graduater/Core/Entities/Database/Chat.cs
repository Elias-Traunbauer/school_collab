using Core.Contracts.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities.Database;

public class Chat : DatabaseEntity, IChat
{
    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public int CreatorUserId { get; set; }

    public virtual ICollection<ChatMember>? ChatMembers { get; set; }

    public virtual ICollection<ChatMessage>? ChatMessages { get; set; }

    [ForeignKey(nameof(CreatorUserId))]
    public virtual User CreatorUser { get; set; } = null!;

    [ForeignKey(nameof(PictureId))]
    public virtual File? Picture { get; set; }

    public int? PictureId { get; set; }
}