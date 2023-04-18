using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Contracts.Models
{
    public interface IRegisterResult
    {
        public IServiceResult ServiceResult { get; set; }
        public string EmailVerficationToken { get; set; }
    }
}
