using Core.Contracts;
using Core.Contracts.Entities;
using Core.Contracts.Models;
using Core.Contracts.Services;
using Core.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services
{
    public class FileService : IFileService
    {
        private readonly IUnitOfWork _unitOfWork;

        public FileService(IUnitOfWork uow)
        {
            _unitOfWork = uow;
        }

        public async Task<IServiceResult<IFile>> GetFileAsync(int id)
        {
            var file = await _unitOfWork.FileRepository.GetFileByIdAsync(id);
            if (file == null)
            {
                return new ServiceResult<IFile>("Id", "File not found");
            }
            return new ServiceResult<IFile>(file);
        }

        public async Task<IServiceResult> StoreFileAsync(string filename, string contentType, Stream content)
        {
            Core.Entities.Database.File file = new()
            {
                Name = filename,
                ContentType = contentType,
                Content = content
            };
        }
    }
}
