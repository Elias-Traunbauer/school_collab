using Trauni.EntityFramework.LargeBlobs.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Trauni.EntityFramework.LargeBlobs
{
    /// <summary>
    /// Your AppDbContext must inherit from this class
    /// </summary>
    public class EFLargeBlobApplicationDbContext : DbContext
    {
        public virtual DbSet<EFLargeBlob> EFLargeBlobs { get; set;}

        public virtual DbSet<EFLargeBlobChunk> EFLargeBlobChunks { get; set;}
    }
}
