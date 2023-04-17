using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities;

public partial class User : DatabaseEntity
{
    public string Username { get; set; } = string.Empty;

    public string FirstName { get; set; } = string.Empty;

    public string LastName { get; set; } = string.Empty;

    [ForeignKey(nameof(ProfilePictureId))]
    public File? ProfilePicture { get; set; }

    public int ProfilePictureId { get; set; }

    public string Email { get; set; } = string.Empty;

    public string? PasswordHash { get; set; }

    public string? PasswordSalt { get; set; }

    public string? EmailVerificationToken { get; set; }

    public DateTime? EmailVerificationTokenExpiration { get; set; }

    public string? PasswordResetToken { get; set; }

    public DateTime? PasswordResetTokenExpiration { get; set; }

    public bool IsEmailVerified { get; set; }

    public UserPermission Permissions { get; set; }

    public virtual ICollection<Assignment> Assignments { get; set; } = new List<Assignment>();

    public virtual ICollection<Chat> Chats { get; set; } = new List<Chat>();

    public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();

    public virtual ICollection<Group> Groups { get; set; } = new List<Group>();

    public virtual ICollection<Notification> Notifications { get; set; } = new List<Notification>();

    public virtual ICollection<Poll> Polls { get; set; } = new List<Poll>();

    public virtual ICollection<Post> Posts { get; set; } = new List<Post>();
}

[Flags]
public enum UserPermission
{
    None = 0,
    View = 1 << 0,
    Create = 1 << 1,
    Edit = 1 << 2,
    Delete = 1 << 3,
    Admin = 1 << 4
}