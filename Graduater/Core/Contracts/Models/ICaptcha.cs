using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Contracts.Models
{
    public interface ICaptcha
    {
        string CorrectResult { get; set; }
        string Id { get; set; }
        DateTime Expires { get; set; }
    }
}
