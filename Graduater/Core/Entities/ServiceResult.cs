using Core.Contracts;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class ServiceResult : IServiceResult
    {
        public bool Success { get; set; }

        Dictionary<string, List<string>> Errors { get; set; } = new Dictionary<string, List<string>>();

        public dynamic GetErrors()
        {
            dynamic errorResult = new ExpandoObject();

            foreach (var item in Errors)
            {
                errorResult.Ad
            }

            return errorResult;
        }
    }
}
