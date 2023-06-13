using Core.Contracts.Entities;
using Core.Contracts.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Persistence.Repositories
{
    public class FileRepository : IFileRepository
    {
        private readonly ApplicationDbContext _context;

        public FileRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task CreateFileAsync(Core.Entities.Database.File file)
        {
            await _context.Files.AddAsync(file);
        }

        public async Task<IFile?> GetFileByIdAsync(int id)
        {
            return await _context.Files.FindAsync(id);
        }

        public async Task<IFile?> GetFileWithContentByIdAsync(int id)
        {
            return await _context.Files.Where(x => x.Id == id).SingleOrDefaultAsync();
        }

        public async Task<bool> DeleteFileAsync(int id)
        {
            var file = await _context.Files.FindAsync(id);
            if (file == null)
            {
                return false;
            }
            _context.Files.Remove(file);
            return true;
        }
    }
}