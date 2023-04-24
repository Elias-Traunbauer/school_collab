using Core.Contracts.Models;
using Core.Contracts.Services;
using Core.Entities.Models;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services
{
    public class CaptchaRegistryService : ICaptchaRegistryService
    {
        private readonly ConcurrentDictionary<string, Captcha> _captchaStore = new ConcurrentDictionary<string, Captcha>();

        public void AddCaptcha(string id, Captcha captcha)
        {
            var res = _captchaStore.TryAdd(id, captcha);
            if (!res)
            {
                throw new Exception("Internal server error");
            }
        }

        public ICaptcha? GetCaptcha(string id)
        {
            _captchaStore.Remove(id, out Captcha? captcha);
            return captcha;
        }
    }
}
