﻿using Core.Contracts;
using Core.Contracts.Entities;
using Core.Contracts.Models;
using Core.Contracts.Services;
using Core.Entities.Models;
using Persistence;

namespace Service.Services
{
    public class FileService : IFileService
    {
        private readonly ApiConfig _config;
        private readonly IUnitOfWork _unitOfWork;

        public FileService(IUnitOfWork uow, ApiConfig apiConfig)
        {
            _config = apiConfig;
            _unitOfWork = uow;
        }

        public async Task<IServiceResult> DeleteFileAsync(int id)
        {
            var res = await _unitOfWork.FileRepository.DeleteFileAsync(id);

            if (!res)
            {
                return new ServiceResult("Id", "File not found");
            }
            await _unitOfWork.SaveChangesAsync();
            return new ServiceResult();
        }

        public async Task<IServiceResult<IFile>> GetFileAsync(int id)
        {
            var file = await _unitOfWork.FileRepository.GetFileWithContentByIdAsync(id);
            if (file == null)
            {
                return new ServiceResult<IFile>("Id", "File not found");
            }
            return new ServiceResult<IFile>(file);
        }

        public async Task<IServiceResult<int>> StoreFileAsync(int userId, string filename, string contentType, string fileExtension, Stream content, CancellationToken cancellationToken)
        {
            if (content.Length > _config.UploadMaxFileSize)
            {
                return new ServiceResult<int>("File", "File is too large");
            }
            if (content.Length == 0)
            {
                return new ServiceResult<int>("File", "File is empty");
            }
            if (!_config.PermittedFileExtensions.Contains(fileExtension))
            {
                return new ServiceResult<int>("File", "File type is not permitted");
            }
            byte[] fileContent = new byte[content.Length];
            await content.ReadAsync(fileContent.AsMemory(0, (int)content.Length), cancellationToken);

            Core.Entities.Database.File file = new()
            {
                Name = filename,
                ContentType = fileExtension,
                Content = fileContent,
                UploadedById = userId,
                MIME_Type = contentType,
                Size = content.Length
            };

            await _unitOfWork.FileRepository.CreateFileAsync(file);

            await _unitOfWork.SaveChangesAsync();

            return new ServiceResult<int>(file.Id);
        }
    }
}