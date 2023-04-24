using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Core.Contracts.Entities;

namespace Core.Entities.Database;

public class File : DatabaseEntity, IFile
{
    [Required]
    public string Name { get; set; } = string.Empty;

    [Required]
    public virtual byte[] Content { get; set; } = Array.Empty<byte>();

    [Required]
    [ForeignKey(nameof(UploadedById))]
    public virtual User? UploadedBy { get; set; }

    public int UploadedById { get; set; }

    [NotMapped]
    public long Size
    {
        get
        {
            return Content.LongLength;
        }
    }
}
