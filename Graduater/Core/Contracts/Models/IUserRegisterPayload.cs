using System.ComponentModel.DataAnnotations;

namespace Core.Contracts.Models
{
    public interface IUserRegisterPayload
    {
        [Required]
        [MinLength(4)]
        public string Username { get; set; }

        [Required]
        [MinLength(2)]
        public string Firstname { get; set; }

        [Required]
        [MinLength(2)]
        public string Lastname { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [RegularExpression("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$", ErrorMessage = "Password must contain a lowercase letter, a uppercase letter and a digit")]
        public string Password { get; set; }

        [Required]
        public string RepeatedPassword { get; set; }
    }
}