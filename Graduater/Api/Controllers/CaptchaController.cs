using Api.Attributes;
using Core.Contracts.Services;
using Core.Entities.Models;
using Microsoft.AspNetCore.Mvc;
using Service.Services;
using System.Drawing;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class CaptchaController : Controller
    {
        private readonly ICaptchaRegistryService _captchaProvider;

        public CaptchaController(ICaptchaRegistryService captchaProvider)
        {
            _captchaProvider = captchaProvider;
        }

        [HttpGet]
        [RateLimit(maxRequestsPerMinute: 6, fixedTimeFrame: false)]
        [NoAuthenticationRequired]
        public async Task<IActionResult> GetCaptchaImage()
        {
            var id = Guid.NewGuid().ToString();

            await Task.Delay(1000);

            return Ok(new
            {
                Text = "Hello " + id
            });
        }
    }
}
