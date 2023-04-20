using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Contracts.Services
{
    public interface IPasswordService
    {
        string HashPassword(string password, string salt);
    }
}
