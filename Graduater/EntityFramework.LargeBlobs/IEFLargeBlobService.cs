using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Trauni.EntityFramework.LargeBlobs
{
    /// <summary>
    /// Type to resolve the EFLargeBlobService from the DI container
    /// </summary>
    /// <typeparam name="YourAppDbContext">The type of the application's DbContext.</typeparam>
    public interface IEFLargeBlobService<YourAppDbContext> where YourAppDbContext : EFLargeBlobApplicationDbContext
    {
        public Task<Guid> StoreBlobAsync(Stream stream);
        public Task<Guid> StoreBlobAsync(byte[] blob);
        public Guid StoreBlob(Stream stream);
        public Guid StoreBlob(byte[] blob);

        public Task<Stream> ReadBlobAsStreamAsync(Guid Id);
        public Task<byte[]> ReadBlobAsync(Guid Id);
        public Stream ReadBlobAsStream(Guid Id);
        public byte[] ReadBlob(Guid Id);

        public Task DeleteBlobAsync(Guid Id);
        public void DeleteBlob(Guid Id);
    }
}
