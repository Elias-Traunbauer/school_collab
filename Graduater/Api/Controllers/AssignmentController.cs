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
        [RateLimit(20)]
        public async Task<IActionResult> GetAssignmentsForUser([FromServices] IAssignmentService assignmentService)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = HttpContext.GetUserInfo().User!;
            var result = await assignmentService.GetAssignmentsForUserAsync(user.Id);

            if (result.Status != 200)
            {
                return Ok(result);
            }

            return Ok(result.Value!.Cast<Assignment>());
        }

        [HttpGet("{assignmentId}")]
        [EndpointPermission(Core.Entities.Database.UserPermission.View)]
        [RateLimit(20)]
        public async Task<IActionResult> GetAssignment(int assignmentId, [FromServices] IAssignmentService assignmentService)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await assignmentService.GetAssignmentByIdAsync(assignmentId);
            if (result.Status != 200)
            {
                return Ok(result);
            }
            return Ok(result.Value);
        }

        [HttpPost]
        [EndpointPermission(Core.Entities.Database.UserPermission.Create)]
        [RateLimit(10)]
        public async Task<IActionResult> CreateAssignment([FromBody] AssignmentPostPayload assignmentPostPayload, [FromServices] IAssignmentService assignmentService)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = HttpContext.GetUserInfo().User!;
            var result = await assignmentService.CreateAssignmentAsync(assignmentPostPayload, user.Id);

            if (result.Status != 200)
            {
                return Ok(result);
            }

            return Ok();
        }

        [HttpPut]
        [EndpointPermission(Core.Entities.Database.UserPermission.View)]
        [RateLimit(20)]
        public async Task<IActionResult> UpdateAssignment([FromBody] AssignmentUpdatePayload assignment, [FromServices] IAssignmentService assignmentService)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await assignmentService.UpdateAssignmentAsync(assignment.Convert());

            if (result.Status != 200)
            {
                return Ok(result);
            }

            return Ok(result);
        }

        [HttpDelete("{assignmentId}")]
        [RateLimitAttribute(10)]
        public Task<IActionResult> DeleteAssignment(int assignmentId, [FromServices] IAssignmentService assignmentService)
        {
            if (!ModelState.IsValid)
            {
                return Task.FromResult<IActionResult>(BadRequest(ModelState));
            }

            var user = HttpContext.GetUserInfo().User!;

            return Task.FromResult<IActionResult>(Ok());
        }
    }
}