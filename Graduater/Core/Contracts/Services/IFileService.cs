using Core.Contracts.Entities;
using Core.Contracts.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Contracts.Services
{
    public interface IFileService
    {
        Task<IServiceResult<IFile>> GetFileAsync(int id);
        Task<IServiceResult<int>> StoreFileAsync(string filename, string contentType, Stream content);
        Task<IServiceResult> DeleteFileAsync(int id);
    }
}
