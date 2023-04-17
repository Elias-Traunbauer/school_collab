using Core.Entities;
using Mysqlx.Expr;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.DataTransferObjects
{
    /// <summary>
    /// Data transfer object for <see cref="User"/>
    /// Only contains properties that are allowed to be sent to the client according to the privacy settings of the user
    /// </summary>
    public class UserDTO : DatabaseEntity
    {
        public string? Username { get; set; } = string.Empty;
        public string? FirstName { get; set; } = string.Empty;
        public string? LastName { get; set; } = string.Empty;

        public int? ProfilePictureId { get; set; }
        public string? Email { get; set; } = string.Empty;
        public UserPermission? Permissions { get; set; }

        /// <summary>
        /// Creates an <see cref="UserDTO"/> according to the data of an <see cref="User"/>
        /// Privacy can be turned off
        /// </summary>
        /// <param name="user">The user to take the data from</param>
        /// <param name="respectPrivacy">Whether to only include data that is set to public</param>
        public UserDTO(User user, bool respectPrivacy = true)
        {
            Id = user.Id;
            RowVersion = user.RowVersion;
            Username = user.Username;
            FirstName = ((user.PrivacySettings & UserPrivacy.ShowFirstName) != 0) && respectPrivacy ? user.FirstName : null;
            LastName = ((user.PrivacySettings & UserPrivacy.ShowLastName) != 0) && respectPrivacy ? user.LastName : null;
            ProfilePictureId = user.ProfilePicture?.Id;
            Email = ((user.PrivacySettings & UserPrivacy.ShowEmail) != 0) && respectPrivacy ? user.Email : null;
            Permissions = ((user.PrivacySettings & UserPrivacy.ShowPermissions) != 0) && respectPrivacy ? user.Permissions : null;
        }
    }
}