using Core.Contracts.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities.Database
{
    public class UserSession : DatabaseEntity, IUserSession
    {
        [ForeignKey(nameof(UserId))]
        public virtual User? User { get; set; }

        public int UserId { get; set; }

        [Required]
        public string SessionKey { get; set; } = string.Empty;

        [Required]
        public DateTime IssuedAt { get; set; }

        [Required]
        public string Ip { get; set; } = string.Empty;

        [Required]
        public DateTime Expires { get; set; }

        [Required]
        public DateTime LastAction { get; set; }
    }
}