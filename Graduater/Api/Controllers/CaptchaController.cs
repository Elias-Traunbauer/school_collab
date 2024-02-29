using Api.Attributes;
using Core.Contracts.Services;
using Microsoft.AspNetCore.Mvc;

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
        [RateLimitAttribute(maxRequestsPerMinute: 6, rateLimitMode: RateLimitMode.SlidingTimeWindow)]
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

        [HttpPost("bogos")]
        [RateLimitAttribute(maxRequestsPerMinute: 6, rateLimitMode: RateLimitMode.SlidingTimeWindow)]
        [NoAuthenticationRequired]
        public async Task<IActionResult> BogosBinted([FromQuery] string binted)
        {
            return Ok("Photos printed");
        }
    }
}