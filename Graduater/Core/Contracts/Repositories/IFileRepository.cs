using Core.Contracts.Entities;

namespace Core.Contracts.Repositories
{
    public interface IFileRepository
    {
        Task<IFile?> GetFileByIdAsync(int id);

        Task<IFile?> GetFileWithContentByIdAsync(int id);

        Task CreateFileAsync(Core.Entities.Database.File file);

        Task<bool> DeleteFileAsync(int id);
    }
}