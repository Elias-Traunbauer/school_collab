using Core.Entities.Database;

namespace Core.Contracts.Entities
{
    public interface IUser
    {
        ICollection<Assignment> Assignments { get; set; }
        ICollection<Chat> Chats { get; set; }
        ICollection<Comment> Comments { get; set; }
        string Email { get; set; }
        string? EmailVerificationToken { get; set; }
        DateTime? EmailVerificationTokenExpiration { get; set; }
        string FirstName { get; set; }
        ICollection<Group> Groups { get; set; }
        bool IsEmailVerified { get; set; }
        string LastName { get; set; }
        ICollection<Notification> Notifications { get; set; }
        string PasswordHash { get; set; }
        string? PasswordResetToken { get; set; }
        DateTime? PasswordResetTokenExpiration { get; set; }
        string PasswordSalt { get; set; }
        UserPermission Permissions { get; set; }
        ICollection<Poll> Polls { get; set; }
        ICollection<Post> Posts { get; set; }
        UserPrivacy PrivacySettings { get; set; }
        Core.Entities.Database.File? ProfilePicture { get; set; }
        int ProfilePictureId { get; set; }
        DateTime RegisteredAt { get; set; }
        string Username { get; set; }
        ICollection<UserSession> UserSessions { get; set; }
    }
}