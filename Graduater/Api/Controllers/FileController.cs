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
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var file = await fileService.GetFileAsync(id);
            if (file.Status != 200)
            {
                return Ok(file);
            }
            return File(file.Value!.Content, file.Value.ContentType);
        }

        public record FileUploadPayload(string Filename, IFormFile Content);

        [HttpPost]
        [EndpointPermission(Core.Entities.Database.UserPermission.Create)]
        [RateLimit(3, RateLimitMode.SlidingTimeWindow)]
        public async Task<IActionResult> UploadFile([FromBody] IFormFile file, [FromServices] IFileService fileService)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await fileService.StoreFileAsync(file.FileName, file.ContentType, file.OpenReadStream());
            if (result.Status != 200)
            {
                return Ok(result);
            }

            return Ok(new
            {
                Id = result.Value
            });
        }

        [HttpDelete("{id}")]
        [EndpointPermission(Core.Entities.Database.UserPermission.Default)]
        [RateLimit(30, RateLimitMode.SlidingTimeWindow)]
        public async Task<IActionResult> DeleteFile(int id, [FromServices] IFileService fileService)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var file = await fileService.DeleteFileAsync(id);
            if (file.Status != 200)
            {
                return Ok(file);
            }
            return Ok();
        }
    }
}
