using Api.Helpers;
using Core.Contracts.EZCRUD;
using Core.Contracts.Services;
using Core.Entities.Database;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    public record PollId(int Id);
    [Route("/api/Poll")]
    public class PollController : EZCRUDEnpoint<PollCreatePayload, PollUpdatePayload, PollId, Poll, int, IPollService>
    {
        public PollController() : base(x => x.Id)
        {
        }

        [HttpPost]
        public override async Task<IActionResult> Create([FromBody] PollCreatePayload payload, [FromServices] IPollService service)
        {
            var res = await service.CreateAsync(payload, HttpContext.GetUserInfo().User!.Id);

            return Ok(new
            {
                Id = res
            });
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAll([FromServices] IPollService service)
        {
            List<Poll> res = await service.GetAllAsync();

            return Ok(res);
        }

        [HttpPost("vote/{id}")]
        public async Task<IActionResult> Vote([FromRoute] int id, [FromServices] IPollService service)
        {
            var user = HttpContext.GetUserInfo().User!;
            int newId = await service.VoteAsync(id, user.Id);

            return Ok();
        }

        [HttpGet("{id}/IfIHaveVoted")]
        public async Task<IActionResult> IfIHaveVoted([FromRoute] int id, [FromServices] IPollService summaryService)
        {
            var user = HttpContext.GetUserInfo().User!;
            int result = await summaryService.IfIHaveVotedAsync(id, user.Id);

            return Ok(new
            {
                Value = result
            });
        }
    }
}
