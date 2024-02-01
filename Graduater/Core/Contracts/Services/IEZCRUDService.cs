namespace Core.Contracts.Services
{
    public interface IEZCRUDService<C, Object, Id> where Id : IComparable 
    {
        public Task<Object> ReadAsync(Id id);
        public Task<Id> CreateAsync(C model);
        public Task UpdateAsync(Object model);
        public Task DeleteAsync(Id id);
    }
}
