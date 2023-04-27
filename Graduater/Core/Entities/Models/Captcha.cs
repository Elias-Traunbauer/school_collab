using Core.Contracts.Models;

namespace Core.Entities.Models
{
    public class Captcha : ICaptcha
    {
        public string CorrectResult { get; set; } = "";
        public string Id { get; set; } = "";
        public DateTime Expires { get; set; }
    }
}