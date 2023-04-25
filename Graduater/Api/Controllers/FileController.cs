using Api.Attributes;
using Core.Contracts.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class FileController : Controller
    {
        [HttpGet("{id}")]
        [EndpointPermission(Core.Entities.Database.UserPermission.View)]
        [RateLimit(30, RateLimitMode.SlidingTimeWindow)]
        public async Task<IActionResult> GetFile(int id, [FromServices] IFileService fileService)
        {
            var file = await fileService.GetFileAsync(id);
            if (file == null)
            {
                return Ok(file);
            }
            return File(file.Value!.Content, file.Value.ContentType);
        }

        public record FileUploadPayload(string Filename, byte[] Content);

        [HttpPost("upload")]
        [EndpointPermission(Core.Entities.Database.UserPermission.Create)]
        [RateLimit(3, RateLimitMode.SlidingTimeWindow)]
        public async Task<IActionResult> UploadFile(FileUploadPayload payload, [FromServices] IFileService fileService)
        {
            await Task.Delay(1000);

            return Ok(payload.Filename);
        }
    }
}
