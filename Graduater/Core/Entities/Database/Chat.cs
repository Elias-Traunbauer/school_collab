using Core.Contracts.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities.Database;

public class Chat : DatabaseEntity, IChat
{
    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public int CreatorUserId { get; set; }

    public ICollection<ChatMember> ChatMembers { get; set; } = null!;

    public ICollection<ChatMessage> ChatMessages { get; set; } = null!;

    [ForeignKey(nameof(CreatorUserId))]
    public User? CreatorUser { get; set; } = null!;

    [ForeignKey(nameof(PictureId))]
    protected virtual File? Picture { get; set; }

    public int? PictureId { get; set; }
}