using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities;

public class Report : DatabaseEntity
{
    [Required]
    public DateTime CreatedAt { get; set; } = DateTime.Now;

    [Required]
    [ForeignKey(nameof(CreatedById))]
    public User CreatedBy { get; set; } = new();

    public int CreatedById { get; set; }

    [Required]
    public string Reported { get; set; } = null!;

    public int EntityId { get; set; }

    public string? Reason { get; set; }

    [Required]
    public ReportType Type { get; set; } = ReportType.None;
}

// flags for the type of report
[Flags]
public enum ReportType
{
    None = 0,
    Spam = 1,
    Inappropriate = 2,
    Other = 4
}