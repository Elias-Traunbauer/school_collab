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
    public class AssignmentController : Controller
    {
        private readonly ApiConfig _config;

        public AssignmentController(ApiConfig configuration)
        {
            _config = configuration;
        }

        [HttpGet("related")]
        [EndpointPermission(Core.Entities.Database.UserPermission.View)]
        [RateLimitAttribute(20)]
        public async Task<IActionResult> GetAssignmentsForUser([FromServices] IGroupService groupService)
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

            return Ok(result.Value);
        }

        [HttpPost]
        [EndpointPermission(Core.Entities.Database.UserPermission.Create)]
        [RateLimit(10)]
        public async Task<IActionResult> CreateGroup([FromBody] Group group, [FromServices] IGroupService groupService)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = HttpContext.GetUserInfo().User!;
            group.CreatorUserId = user.Id;

            var result = await groupService.CreateGroupAsync(group);

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