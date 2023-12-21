﻿using Core.Contracts.EZCRUD;
using Core.Contracts.Models;
using Core.Contracts.Services;
using Core.Entities.Database;
using Microsoft.AspNetCore.Mvc;
using Service.Services;

namespace Api.Controllers
{
    [Route("/api/Summary")]
    public class SummaryControllerEZC : EZCRUDEnpoint<CreateSummaryRequest, Summary, int, ISummaryService>
    {
        [HttpGet("BySubject/{id}")]
        public IActionResult GetBySubject([FromRoute]int id, [FromServices]ISummaryService summaryService)
        {
            return Ok(summaryService.GetBySubject(id));
        }
    }
}