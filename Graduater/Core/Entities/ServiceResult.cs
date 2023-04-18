using Core.Contracts;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class ServiceResult : IServiceResult
    {
        public bool Success
        {
            get
            {
                return Errors.Count == 0;
            }
        }

        public static ServiceResult Completed => new();

        public Dictionary<string, List<string>> Errors { get; set; } = new Dictionary<string, List<string>>();

        public dynamic GetErrors()
        {
            var errorResult = new ExpandoObject() as IDictionary<string, object>;

            foreach (var item in Errors)
            {
                errorResult.Add(item.Key, item.Value);
            }

            return errorResult;
        }
    }
}
