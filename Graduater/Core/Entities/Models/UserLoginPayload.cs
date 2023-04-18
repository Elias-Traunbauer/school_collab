using Core.Contracts.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
