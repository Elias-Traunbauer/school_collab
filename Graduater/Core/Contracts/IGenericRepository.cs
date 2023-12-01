using Core.Entities.Database;

namespace Core.Contracts
{
    public interface IGenericRepository<Id>
    {
        Task<T?> GetAsync<T>(Id Id) where T : DatabaseEntity;

        Task AddAsync<T>(T model) where T : DatabaseEntity;

        Task UpdateAsync<T>(T entity) where T : DatabaseEntity;

        Task<bool> DeleteAsync<T>(Id Id) where T : DatabaseEntity;
    }
}