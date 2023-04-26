using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Core.Contracts.Entities;
using Microsoft.EntityFrameworkCore;

namespace Core.Entities.Database;

[Index(nameof(Username), IsUnique = true)]
[Index(nameof(Email), IsUnique = true)]
public class User : DatabaseEntity, IUser
{
    public string Username { get; set; } = string.Empty;

    public string FirstName { get; set; } = string.Empty;

    public string LastName { get; set; } = string.Empty;

    [ForeignKey(nameof(ProfilePictureId))]
    public virtual File? ProfilePicture { get; set; }

    public int? ProfilePictureId { get; set; }

    public string Email { get; set; } = string.Empty;

    public string PasswordHash { get; set; } = string.Empty;

    public string PasswordSalt { get; set; } = string.Empty;

    public string? EmailVerificationToken { get; set; }

    public DateTime? EmailVerificationTokenExpiration { get; set; }

    public string? PasswordResetToken { get; set; }

    public DateTime? PasswordResetTokenExpiration { get; set; }

    public DateTime RegisteredAt { get; set; }

    public bool IsEmailVerified { get; set; }

    public UserPermission Permissions { get; set; }

    public UserPrivacy PrivacySettings { get; set; }

    public virtual ICollection<Assignment>? Assignments { get; set; }

    public virtual ICollection<Chat>? Chats { get; set; }

    public virtual ICollection<Comment>? Comments { get; set; }

    public virtual ICollection<Group>? Groups { get; set; }

    public virtual ICollection<Notification>? Notifications { get; set; }

    public virtual ICollection<Poll>? Polls { get; set; }

    public virtual ICollection<Post>? Posts { get; set; }

    public virtual ICollection<UserSession>? Sessions { get; set; }
}

[Flags]
public enum UserPermission
{
    None = 0,
    View = 1 << 0,
    Create = 1 << 1,
    Edit = 1 << 2,
    Delete = 1 << 3,
    Admin = 1 << 4,
    Disabled = 1 << 5,
    Moderator = View | Create | Edit | Delete,
    Default = View | Create
}

[Flags]
public enum UserPrivacy
{
    None = 0,
    ShowFirstName = 1 << 0,
    ShowLastName = 1 << 1,
    ShowEmail = 1 << 2,
    ShowAssignments = 1 << 3,
    ShowGroups = 1 << 4,
    ShowPolls = 1 << 5,
    ShowPosts = 1 << 6,
    ShowComments = 1 << 7,
    ShowPermissions = 1 << 8,
    ShowRegisteredAt = 1 << 9,
    ShowAll = ShowFirstName | ShowLastName | ShowEmail | ShowAssignments | ShowGroups | ShowPolls | ShowPosts | ShowComments | ShowPermissions | ShowRegisteredAt
}