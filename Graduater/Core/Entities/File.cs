using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities;

public class File : DatabaseEntity
{
    [Required]
    public string Name { get; set; } = string.Empty;

    [Required]
    public byte[] Content { get; set; } = Array.Empty<byte>();

    [Required]
    [ForeignKey(nameof(UploadedById))]
    public User UploadedBy { get; set; } = new();

    public int UploadedById { get; set; }

    [NotMapped]
    public long Size { 
        get 
        {
            return Content.LongLength;
        } 
    }
}
