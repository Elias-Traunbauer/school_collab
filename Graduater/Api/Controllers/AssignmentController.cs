using Api.Attributes;
using Api.Helpers;
using Core.Contracts.Entities;
using Core.Contracts.Models;
using Core.Contracts.Services;
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

        [HttpGet]
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
        public async Task<IActionResult> UpdateAssignment([FromServices] IAssignmentService assignmentService)
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

            return Ok(result.Value);
        }
    }
}
