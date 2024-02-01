using Api.Helpers;
using Core.Contracts.EZCRUD;
using Core.Contracts.Models;
using Core.Contracts.Services;
using Core.Entities.Database;
using Microsoft.AspNetCore.Mvc;
using Service.Services;
using System.ComponentModel.DataAnnotations;

namespace Api.Controllers
{
    public record SummaryId(int Id);

    [Route("/api/Summary")]
    public class SummaryControllerEZC : EZCRUDEnpoint<CreateSummaryRequest, SummaryUpdatePayload, SummaryId, Summary, int, ISummaryService>
    {
        public SummaryControllerEZC():base(x => x.Id)
        { 
        }

        [HttpGet("BySubject/{id}")]
        public IActionResult GetBySubject([FromRoute]int id, [FromServices]ISummaryService summaryService)
        {
            return Ok(summaryService.GetBySubject(id));
        }

        public record VotePayload([Range(-1, 1)]int value);

        [HttpPost("{id}/vote")]
        public async Task<IActionResult> Vote([FromRoute]int id, [FromBody]VotePayload payload, [FromServices]ISummaryService summaryService)
        {
            var user = HttpContext.GetUserInfo().User!;
            await summaryService.VoteAsync(id, user.Id, payload.value);

            return Ok();
        }

        [HttpGet("{id}/IfIHaveVoted")]
        public async Task<IActionResult> IfIHaveVoted([FromRoute]int id, [FromServices]ISummaryService summaryService)
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
