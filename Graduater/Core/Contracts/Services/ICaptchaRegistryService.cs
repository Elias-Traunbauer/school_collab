using Core.Contracts.Models;
using Core.Entities.Models;

namespace Core.Contracts.Services
{
    public interface ICaptchaRegistryService
    {
        void AddCaptcha(string id, Captcha captcha);

        ICaptcha? GetCaptcha(string id);
    }
}