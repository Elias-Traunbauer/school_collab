using Core.Contracts.Services;
using Core.Entities.Models;
using Microsoft.AspNetCore.Mvc;
using Service.Services;
using System.Drawing;

namespace Api.Controllers
{
    public class CaptchaController : Controller
    {
        private readonly ICaptchaRegistryService _captchaProvider;

        public CaptchaController(CaptchaRegistryService captchaProvider)
        {
            _captchaProvider = captchaProvider;
        }

        [HttpGet]
        public async Task<IActionResult> GetCaptchaImage()
        {
            var captcha = GenerateCaptcha();
            var id = Guid.NewGuid().ToString();
            _captchaProvider.AddCaptcha(id, captcha);

            using var stream = new MemoryStream();
            stream.Seek(0, SeekOrigin.Begin);
            
            return new FileStreamResult(stream, "image/jpeg")
            {
                FileDownloadName = $"{id}.jpg"
            };
        }

        private Captcha GenerateCaptcha()
        {
            var captcha = new Captcha();
            var font = new Font("Arial", 20, FontStyle.Bold);
            var brush = new SolidBrush(Color.Black);
            var random = new Random();

            for (int i = 0; i < captcha.Length; i++)
            {
                var ch = captcha.Text[i].ToString();
                var x = i * 20 + random.Next(10);
                var y = random.Next(10);
                var point = new PointF(x, y);
                captcha.Image.DrawString(ch, font, brush, point);
            }

            for (int i = 0; i < 10; i++)
            {
                var x1 = random.Next(captcha.Image.Width);
                var y1 = random.Next(captcha.Image.Height);
                var x2 = random.Next(captcha.Image.Width);
                var y2 = random.Next(captcha.Image.Height);
                var pen = new Pen(Color.Gray, 1);
                captcha.Image.DrawLine(pen, x1, y1, x2, y2);
            }

            return captcha;
        }
    }
}
