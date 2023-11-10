using Core.Entities.Database;

namespace Core.Contracts.Entities
{
    public interface IUser
    {
        string Email { get; set; }
        string? EmailVerificationToken { get; set; }
        DateTime? EmailVerificationTokenExpiration { get; set; }
        string FirstName { get; set; }
        bool TwoFactorEnabled { get; set; }
        bool IsEmailVerified { get; set; }
        string LastName { get; set; }
        string PasswordHash { get; set; }
        string? PasswordResetToken { get; set; }
        DateTime? PasswordResetTokenExpiration { get; set; }
        string PasswordSalt { get; set; }
        UserPermission Permissions { get; set; }
        UserPrivacy PrivacySettings { get; set; }
        Core.Entities.Database.File? ProfilePicture { get; set; }
        int? ProfilePictureId { get; set; }
        DateTime RegisteredAt { get; set; }
        string Username { get; set; }
        ICollection<UserSession>? Sessions { get; set; }
    }
}