using Core.Contracts.Models;
using Core.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Contracts.Services
{
    public interface ICaptchaRegistryService
    {
        void AddCaptcha(string id, Captcha captcha);

        ICaptcha? GetCaptcha(string id);
    }
}
