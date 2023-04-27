using Core.Contracts.Models;
using System.ComponentModel.DataAnnotations;

namespace Core.Entities.Models
{
    public class UserLoginPayload : IUserLoginPayload
    {
        [Required]
        public string Identifier { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;
    }
}