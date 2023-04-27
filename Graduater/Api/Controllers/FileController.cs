using Api.Attributes;
using Api.Helpers;
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
        [RateLimitAttribute(30, RateLimitMode.SlidingTimeWindow)]
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
            return File(file.Value!.Content!, "application/octet-stream", file.Value!.Name);
        }

        [HttpPost]
        [EndpointPermission(Core.Entities.Database.UserPermission.Create)]
        [RateLimitAttribute(3, RateLimitMode.SlidingTimeWindow)]
        public async Task<IActionResult> UploadFile(IFormFile file, [FromServices] IFileService fileService, CancellationToken token)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var user = HttpContext.GetUserInfo().User!;
            string fileExtension = Path.GetExtension(file.FileName);
            var result = await fileService.StoreFileAsync(user.Id, file.FileName, file.ContentType, fileExtension, file.OpenReadStream(), token);
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
        [RateLimitAttribute(30, RateLimitMode.SlidingTimeWindow)]
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