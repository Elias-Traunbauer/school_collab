using Core.Entities.Database;

namespace Core.Contracts.Entities
{
    public interface IReport
    {
        DateTime CreatedAt { get; set; }
        User? CreatedBy { get; set; }
        int CreatedById { get; set; }
        string Reason { get; set; }
        ReportType Type { get; set; }
        bool WasChecked { get; set; }
    }
}