using Core.Contracts.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities.Database;

public class File : DatabaseEntity, IFile {
    [Required]
    public string Name { get; set; } = string.Empty;

    [NotMapped]
    public byte[] Content {
        get
        {
            return Convert.FromBase64String(ContentBase64);
        }
        set
        {
            ContentBase64 = Convert.ToBase64String(value);
        }
    }

    [MaxLength(2097152)]
    public string ContentBase64 {get; set;} = string.Empty;

    public string ContentType { get; set; } = string.Empty;

    public string MIME_Type { get; set; } = string.Empty;

    public int Downloads { get; set; } = 0;

    public DateTime UploadedAt { get; set; } = DateTime.UtcNow;

    public int? OwnerId { get; set; } = null;

    [Required]
    [ForeignKey(nameof(UploadedById))]
    public virtual User? UploadedBy { get; set; }

    public int UploadedById { get; set; }

    public long Size { get; set; }
}