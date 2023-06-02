﻿using Core.Contracts.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities.Database;

public class File : DatabaseEntity, IFile {
    [Required]
    public string Name { get; set; } = string.Empty;

    [Required]
    public byte[] Content { get; set; } = null!;

    public string ContentType { get; set; } = string.Empty;

    public string MIME_Type { get; set; } = string.Empty;

    [Required]
    [ForeignKey(nameof(UploadedById))]
    public virtual User? UploadedBy { get; set; }

    public int UploadedById { get; set; }

    public long Size { get; set; }
}