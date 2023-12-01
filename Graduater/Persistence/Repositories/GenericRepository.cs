using Core.Contracts;
using Core.Entities.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Repositories
{
    public class GenericRepository<Guid> : IGenericRepository<Guid>
    {
        private ApplicationDbContext appDbContext;


        public GenericRepository(ApplicationDbContext appDbContext) 
        {
            this.appDbContext = appDbContext;
        }

        public async Task AddAsync<T>(T model) where T : DatabaseEntity
        {
            appDbContext.Add(model);
        }

        public async Task<bool> DeleteAsync<T>(Guid Id) where T : DatabaseEntity
        {
            var obj = appDbContext.Find(typeof(T), Id);
            if (obj == null)
            {
                return false;
            }

            appDbContext.Remove(obj);
            return true;
        }

        public async Task<T?> GetAsync<T>(Guid Id) where T : DatabaseEntity
        {
            T? obj = appDbContext.Find(typeof(T), Id) as T;
            return obj;
        }

        public async Task UpdateAsync<T>(T entity) where T : DatabaseEntity
        {
            appDbContext.Update(entity);
        }
    }
}
