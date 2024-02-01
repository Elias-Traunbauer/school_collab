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
    }
}
