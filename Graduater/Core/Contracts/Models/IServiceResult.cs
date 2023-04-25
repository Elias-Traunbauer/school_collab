using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Contracts.Models
{
    public interface IServiceResult<T> : IServiceResult
    {
        public T? Value { get; }
    }

    public interface IServiceResult
    {
        public int Status { get; }
        public dynamic GetErrors();
    }
}
