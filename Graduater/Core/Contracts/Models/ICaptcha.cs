namespace Core.Contracts.Models
{
    public interface ICaptcha
    {
        string CorrectResult { get; set; }
        string Id { get; set; }
        DateTime Expires { get; set; }
    }
}