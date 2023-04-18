using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Contracts.Entities;

namespace Core.Entities.Database
{
    public class UserSession : DatabaseEntity, IUserSession
    {
        [ForeignKey(nameof(UserId))]
        public User User { get; set; } = new User();

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
