using Api.Attributes;
using Api.Helpers;
using Core.Contracts.Models;
using Core.Contracts.Services;
using Core.Entities.Database;
using Microsoft.AspNetCore.Mvc;
using Persistence;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class GroupController : Controller
    {
        private readonly ApiConfig _config;

        public GroupController(ApiConfig configuration)
        {
            _config = configuration;
        }

        [HttpGet("related")]
        [EndpointPermission(Core.Entities.Database.UserPermission.View)]
        [RateLimitAttribute(20)]
        public async Task<IActionResult> GetGroupsForUser([FromServices] IGroupService groupService)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = HttpContext.GetUserInfo().User!;
            var result = await groupService.GetGroupsForUserAsync(user.Id);

            if (result.Status != 200)
            {
                return Ok(result);
            }

            return Ok(result.Value!.Cast<Group>());
        }

        public record GroupPost(string Name, string Description);

        [HttpPost]
        [EndpointPermission(Core.Entities.Database.UserPermission.Create)]
        [RateLimit(10)]
        public async Task<IActionResult> CreateGroup([FromBody] GroupPost group, [FromServices] IGroupService groupService)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = HttpContext.GetUserInfo().User!;

            var result = await groupService.CreateGroupAsync(new Group() { Name = group.Name, Description = group.Description, CreatorUserId = user.Id });

            if (result.Status != 200)
            {
                return Ok(result);
            }

            return Ok(new
            {
                Id = result.Value
            });
        }

        [HttpDelete("{groupId}")]
        [EndpointPermission(Core.Entities.Database.UserPermission.Delete)]
        [RateLimitAttribute(10)]
        public async Task<IActionResult> DeleteGroup(int groupId, [FromServices] IGroupService groupService)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = HttpContext.GetUserInfo().User!;
            var group = await groupService.GetGroupAsync(groupId);
            if (user.Id != group.Value.CreatorUserId)
            {
                return Unauthorized(new
                {
                    Message = "You are not the creator of this group."
                });
            }
            var result = await groupService.DeleteGroupAsync(groupId);

            return Ok(result);
        }
    }
}