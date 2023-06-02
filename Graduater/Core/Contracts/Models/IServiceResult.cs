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