using Core.Contracts.Models;
using System.Dynamic;

namespace Core.Entities.Models
{
    public class ServiceResult : IServiceResult
    {
        public int Status { get; set; } = 200;

        public static ServiceResult Completed => new();

        public Dictionary<string, List<string>> Errors { get; set; } = new Dictionary<string, List<string>>();

        public ServiceResult()
        {

        }

        public ServiceResult(string key, params string[] errors)
        {
            Status = 400;
            Errors.Add(key, errors.ToList());
        }

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

    public class ServiceResult<T> : ServiceResult, IServiceResult<T>
    {
        public T? Value { get; set; }

        public ServiceResult(T result) : base()
        {
            Value = result;
        }

        public ServiceResult(string key, params string[] errors) : base(key, errors)
        {

        }
    }
}
