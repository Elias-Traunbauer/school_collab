using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Contracts.Models
{
    public interface ILoginPayload
    {
        string Identifier { get; set; }
        string Password { get; set; }
    }
}
