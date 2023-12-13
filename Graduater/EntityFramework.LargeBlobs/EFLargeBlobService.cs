using Trauni.EntityFramework.LargeBlobs.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;

namespace Trauni.EntityFramework.LargeBlobs
{
    /// <summary>
    /// Add this as a scoped service to your DI container
    /// Use the interface IEFLargeBlobService<YourAppDbContext> in your services
    /// </summary>
    /// <typeparam name="YourAppDbContext">The type of your AppDbContext, has to be injectable</typeparam>
    public class EFLargeBlobService<YourAppDbContext> : IEFLargeBlobService<YourAppDbContext> where YourAppDbContext : EFLargeBlobApplicationDbContext
    {
        private readonly YourAppDbContext applicationDbContext;

        public EFLargeBlobService(YourAppDbContext yourAppDbContext)
        {
            applicationDbContext = yourAppDbContext;
        }

        public void DeleteBlob(Guid Id)
        {
            var blob = applicationDbContext.EFLargeBlobs.SingleOrDefault(x => x.Id == Id);
            if (blob == null)
            {
                throw new InvalidOperationException("Blob not found");
            }

            var chunks = applicationDbContext.EFLargeBlobChunks.Where(x => x.EFLargeBlobId == Id);
            applicationDbContext.EFLargeBlobChunks.RemoveRange(chunks);
            applicationDbContext.EFLargeBlobs.Remove(blob);
            applicationDbContext.SaveChanges();
        }

        public async Task DeleteBlobAsync(Guid Id)
        {
            var blob = await applicationDbContext.EFLargeBlobs.SingleOrDefaultAsync(x => x.Id == Id);
            if (blob == null)
            {
                throw new InvalidOperationException("Blob not found");
            }

            var chunks = applicationDbContext.EFLargeBlobChunks.Where(x => x.EFLargeBlobId == Id);
            applicationDbContext.EFLargeBlobChunks.RemoveRange(chunks);
            applicationDbContext.EFLargeBlobs.Remove(blob);
            await applicationDbContext.SaveChangesAsync();
        }

        public byte[] ReadBlob(Guid Id)
        {
            EFLargeBlob eFLargeBlob = applicationDbContext.EFLargeBlobs
                .SingleOrDefault(e => e.Id == Id) 
                ?? throw new InvalidOperationException("Blob not found");

            EFLargeBlobChunk[] eFLargeBlobChunks = applicationDbContext.EFLargeBlobChunks
                .Where(x => x.EFLargeBlobId == Id)
                .OrderBy(x => x.Index)
                .ToArray();

            // validate size
            if (eFLargeBlob.Size != eFLargeBlobChunks.Sum(x => x.Size))
            {
                throw new InvalidOperationException("Blob integrity compromised, blob size validation failed.");
            }

            byte[] binaryData = new byte[eFLargeBlob.Size];
            int index = 0;

            for (int i = 0; i < eFLargeBlobChunks.Length; i++)
            {
                Array.Copy(eFLargeBlobChunks[i].Data, 0, binaryData, index, eFLargeBlobChunks[i].Size);
                index += eFLargeBlobChunks[i].Size;
            }
            
            return binaryData;
        }

        public Stream ReadBlobAsStream(Guid Id)
        {
            EFLargeBlob eFLargeBlob = applicationDbContext.EFLargeBlobs.SingleOrDefault(e => e.Id == Id) ?? throw new InvalidOperationException("Blob not found");

            EFLargeBlobChunk[] eFLargeBlobChunks = applicationDbContext.EFLargeBlobChunks
                .Where(x => x.EFLargeBlobId == Id)
                .OrderBy(x => x.Index)
                .ToArray();

            // Validate size
            if (eFLargeBlob.Size != eFLargeBlobChunks.Sum(x => x.Size))
            {
                throw new InvalidOperationException("Blob integrity compromised, blob size validation failed.");
            }

            MemoryStream stream = new();

            for (int i = 0; i < eFLargeBlobChunks.Length; i++)
            {
                stream.Write(eFLargeBlobChunks[i].Data, 0, eFLargeBlobChunks[i].Size);
            }

            // Reset the stream position to the beginning before returning
            stream.Position = 0;

            return stream;
        }

        public async Task<Stream> ReadBlobAsStreamAsync(Guid Id)
        {
            EFLargeBlob eFLargeBlob = await applicationDbContext.EFLargeBlobs
                .SingleOrDefaultAsync(e => e.Id == Id) ?? throw new InvalidOperationException("Blob not found");

            EFLargeBlobChunk[] eFLargeBlobChunks = await applicationDbContext.EFLargeBlobChunks
                .Where(x => x.EFLargeBlobId == Id)
                .OrderBy(x => x.Index)
                .ToArrayAsync();

            // Validate size
            if (eFLargeBlob.Size != eFLargeBlobChunks.Sum(x => x.Size))
            {
                throw new InvalidOperationException("Blob integrity compromised, blob size validation failed.");
            }

            MemoryStream stream = new();

            foreach (var chunk in eFLargeBlobChunks)
            {
                await stream.WriteAsync(chunk.Data.AsMemory(0, chunk.Size));
            }

            // Reset the stream position to the beginning before returning
            stream.Position = 0;

            return stream;
        }

        public async Task<byte[]> ReadBlobAsync(Guid Id)
        {
            EFLargeBlob eFLargeBlob = await applicationDbContext.EFLargeBlobs
                .SingleOrDefaultAsync(e => e.Id == Id) ?? throw new InvalidOperationException("Blob not found");

            EFLargeBlobChunk[] eFLargeBlobChunks = await applicationDbContext.EFLargeBlobChunks
                .Where(x => x.EFLargeBlobId == Id)
                .OrderBy(x => x.Index)
                .ToArrayAsync();

            // Validate size
            if (eFLargeBlob.Size != eFLargeBlobChunks.Sum(x => x.Size))
            {
                throw new InvalidOperationException("Blob integrity compromised, blob size validation failed.");
            }

            byte[] binaryData = new byte[eFLargeBlob.Size];
            int index = 0;

            foreach (var chunk in eFLargeBlobChunks)
            {
                Array.Copy(chunk.Data, 0, binaryData, index, chunk.Size);
                index += chunk.Size;
            }

            return binaryData;
        }

        public Guid StoreBlob(Stream stream)
        {
            int chunkCount = (int)Math.Ceiling(stream.Length / (double)EFLargeBlobChunk.MAXBLOBCHUNKSIZE);

            EFLargeBlob newBlob = new()
            {
                Size = stream.Length
            };

            applicationDbContext.EFLargeBlobs.Add(newBlob);
            applicationDbContext.SaveChanges();
            Guid newBlobId = newBlob.Id;

            long remainingSize = stream.Length;
            int currentIndex = 0;
            for (int i = 0; i < chunkCount; i++)
            {
                EFLargeBlobChunk eFLargeBlobChunk = new()
                {
                    Index = i,
                    EFLargeBlobId = newBlobId,
                    Size = (int)Math.Min(remainingSize, EFLargeBlobChunk.MAXBLOBCHUNKSIZE)
                };
                eFLargeBlobChunk.Data = new byte[eFLargeBlobChunk.Size];

                stream.Read(eFLargeBlobChunk.Data, 0, eFLargeBlobChunk.Size);

                currentIndex += eFLargeBlobChunk.Size;
                remainingSize -= eFLargeBlobChunk.Size;

                applicationDbContext.EFLargeBlobChunks.Add(eFLargeBlobChunk);
                applicationDbContext.SaveChanges();
            }

            return newBlobId;
        }

        public Guid StoreBlob(byte[] blob)
        {
            int chunkCount = (int)Math.Ceiling(blob.Length / (double)EFLargeBlobChunk.MAXBLOBCHUNKSIZE);

            EFLargeBlob newBlob = new()
            {
                Size = blob.Length
            };

            applicationDbContext.EFLargeBlobs.Add(newBlob);
            applicationDbContext.SaveChanges();
            Guid newBlobId = newBlob.Id;

            int remainingSize = blob.Length;
            int currentIndex = 0;
            for (int i = 0; i < chunkCount; i++)
            {
                EFLargeBlobChunk eFLargeBlobChunk = new()
                {
                    Index = i,
                    EFLargeBlobId = newBlobId,
                    Size = Math.Min(remainingSize, EFLargeBlobChunk.MAXBLOBCHUNKSIZE)
                };
                eFLargeBlobChunk.Data = new byte[eFLargeBlobChunk.Size];

                Array.Copy(blob, currentIndex, eFLargeBlobChunk.Data, 0, eFLargeBlobChunk.Size);

                currentIndex += eFLargeBlobChunk.Size;
                remainingSize -= eFLargeBlobChunk.Size;

                applicationDbContext.EFLargeBlobChunks.Add(eFLargeBlobChunk);
                applicationDbContext.SaveChanges();
            }

            return newBlobId;
        }

        public async Task<Guid> StoreBlobAsync(Stream stream)
        {
            int chunkCount = (int)Math.Ceiling(stream.Length / (double)EFLargeBlobChunk.MAXBLOBCHUNKSIZE);

            EFLargeBlob newBlob = new()
            {
                Size = stream.Length
            };

            applicationDbContext.EFLargeBlobs.Add(newBlob);
            await applicationDbContext.SaveChangesAsync();
            Guid newBlobId = newBlob.Id;

            long remainingSize = stream.Length;
            int currentIndex = 0;
            for (int i = 0; i < chunkCount; i++)
            {
                EFLargeBlobChunk eFLargeBlobChunk = new()
                {
                    Index = i,
                    EFLargeBlobId = newBlobId,
                    Size = (int)Math.Min(remainingSize, EFLargeBlobChunk.MAXBLOBCHUNKSIZE)
                };
                eFLargeBlobChunk.Data = new byte[eFLargeBlobChunk.Size];

                await stream.ReadAsync(eFLargeBlobChunk.Data.AsMemory(0, eFLargeBlobChunk.Size));

                currentIndex += eFLargeBlobChunk.Size;
                remainingSize -= eFLargeBlobChunk.Size;

                applicationDbContext.EFLargeBlobChunks.Add(eFLargeBlobChunk);

                await applicationDbContext.SaveChangesAsync();
            }

            return newBlobId;
        }

        public async Task<Guid> StoreBlobAsync(byte[] blob)
        {
            int chunkCount = (int)Math.Ceiling(blob.Length / (double)EFLargeBlobChunk.MAXBLOBCHUNKSIZE);

            EFLargeBlob newBlob = new()
            {
                Size = blob.Length
            };

            applicationDbContext.EFLargeBlobs.Add(newBlob);
            await applicationDbContext.SaveChangesAsync();

            Guid newBlobId = newBlob.Id;

            int remainingSize = blob.Length;
            int currentIndex = 0;
            for (int i = 0; i < chunkCount; i++)
            {
                EFLargeBlobChunk eFLargeBlobChunk = new()
                {
                    Index = i,
                    EFLargeBlobId = newBlobId,
                    Size = Math.Min(remainingSize, EFLargeBlobChunk.MAXBLOBCHUNKSIZE)
                };
                eFLargeBlobChunk.Data = new byte[eFLargeBlobChunk.Size];

                Array.Copy(blob, currentIndex, eFLargeBlobChunk.Data, 0, eFLargeBlobChunk.Size);

                currentIndex += eFLargeBlobChunk.Size;
                remainingSize -= eFLargeBlobChunk.Size;

                applicationDbContext.EFLargeBlobChunks.Add(eFLargeBlobChunk);

                await applicationDbContext.SaveChangesAsync();
            }

            return newBlobId;
        }
    }
}
