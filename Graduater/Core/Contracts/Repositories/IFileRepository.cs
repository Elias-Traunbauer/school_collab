using Core.Contracts.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Contracts.Repositories
{
    public interface IFileRepository
    {
        Task<IFile> GetFileByIdAsync(int id);
        Task StoreFileAsync(Core.Entities.Database.File file);
    }
}
