using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Contracts.Models
{
    public class UserRegisterPayload : IUserRegisterPayload
    {
        [Required]
        [MinLength(4)]
        public string Username { get; set; } = string.Empty;

        [Required]
        [MinLength(2)]
        public string Firstname { get; set; } = string.Empty;

        [Required]
        [MinLength(2)]
        public string Lastname { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        [RegularExpression("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$", ErrorMessage = "Password must contain a lowercase letter, a uppercase letter and a digit")]
        public string Password { get; set; } = string.Empty;

        [Required]
        public string RepeatedPassword { get; set; } = string.Empty;
    }
}
