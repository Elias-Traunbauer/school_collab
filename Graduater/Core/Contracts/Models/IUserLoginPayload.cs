using System.ComponentModel.DataAnnotations;

namespace Core.Contracts.Models
{
    public interface IUserLoginPayload
    {
        [Required]
        string Identifier { get; set; }
        [Required]
        string Password { get; set; }
    }
}