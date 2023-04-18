using Core.Contracts.Models;
using Core.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities.Models
{
    public class RegisterResult : IRegisterResult
    {
        public IServiceResult ServiceResult { get; set; } = new ServiceResult();
        public string EmailVerficationToken { get; set; } = string.Empty;
    }
}
