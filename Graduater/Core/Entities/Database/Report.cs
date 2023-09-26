using Core.Contracts.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities.Database;

public class Report : IReport
{
    public int Id { get; set; }

    public byte[] RowVersion { get; set; } = Array.Empty<byte>();

    [Required]
    public DateTime CreatedAt { get; set; } = DateTime.Now;

    [Required]
    [ForeignKey(nameof(CreatedById))]
    public virtual User? CreatedBy { get; set; }

    public int CreatedById { get; set; }

    public bool WasChecked { get; set; }

    public string Reason { get; set; } = string.Empty;

    [Required]
    public ReportType Type { get; set; } = ReportType.None;
}

// flags for the type of report
[Flags]
public enum ReportType
{
    None = 0,
    Spam = 1 << 0,
    Inappropriate = 1 << 1,
    Other = 1 << 2
}