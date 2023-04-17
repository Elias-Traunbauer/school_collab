using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities;

public partial class Chat
{
    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public int CreatorUserId { get; set; }

    public virtual ICollection<ChatMember> ChatMembers { get; set; } = new List<ChatMember>();

    public virtual ICollection<ChatMessage> ChatMessages { get; set; } = new List<ChatMessage>();

    [ForeignKey(nameof(CreatorUserId))]
    public virtual User CreatorUser { get; set; } = null!;
}
