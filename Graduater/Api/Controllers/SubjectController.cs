using Core.Contracts.Services;
using Core.Entities.Database;
using Microsoft.AspNetCore.Mvc;
using Persistence;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class SubjectController : Controller
    {
        private readonly ApiConfig _config;

        public SubjectController(ApiConfig configuration)
        {
            _config = configuration;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSubject(int id, [FromServices] ISubjectService subjectService)
        {
            return Ok(
                await subjectService.GetSubjectAsync(id)
                );
        }

        [HttpPost]
        public async Task<IActionResult> CreateSubject([FromBody] Subject subject, [FromServices] ISubjectService subjectService)
        {
            var res = await subjectService.CreateSubjectAsync(subject);
            if (res.Status != 200)
            {
                return BadRequest(res);
            }
            return Ok(new
            {
                Id = res.Value
            });
        }

        [HttpGet("search/{query}")]
        public async Task<IActionResult> SearchSubjects(string query, [FromServices] ISubjectService subjectService)
        {
            var result = await subjectService.SearchSubjectsAsync(query);
            if (result.Status != 200)
            {
                return BadRequest(result);
            }
            
            return Ok(result.Value);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSubject(int id, [FromServices] ISubjectService subjectService)
        {
            var result = await subjectService.DeleteSubjectAsync(id);
            if (result.Status != 200)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }
    }
}