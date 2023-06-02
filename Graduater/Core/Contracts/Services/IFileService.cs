using Core.Contracts.Entities;
using Core.Contracts.Models;

namespace Core.Contracts.Services
{
    public interface IFileService
    {
        Task<IServiceResult<IFile>> GetFileAsync(int id);

        Task<IServiceResult<int>> StoreFileAsync(int userId, string filename, string contentType, string fileExtension, Stream content, CancellationToken cancellationToken);

        Task<IServiceResult> DeleteFileAsync(int id);
    }
}