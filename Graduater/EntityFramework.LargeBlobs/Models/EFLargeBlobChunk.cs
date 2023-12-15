using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Trauni.EntityFramework.LargeBlobs.Models
{
    public class EFLargeBlobChunk
    {
        public static readonly int MAXBLOBCHUNKSIZE = 8000;

        [Key]
        public Guid Id { get; set; }

        [Required]
        public int Index { get; set; }

        [Required]
        public int Size { get; set; }

        [Required]
        public Guid EFLargeBlobId { get; set; }

        [ForeignKey(nameof(EFLargeBlobId))]
        [DeleteBehavior(DeleteBehavior.Cascade)]
        public EFLargeBlob? EFLargeBlob { get; set; }

        [Required]
        [Column(TypeName = "varbinary(8000)")]
        public byte[] Data { get; set; } = Array.Empty<byte>();
    }
}