using Api.Controllers.EZCRUD;
using Core.Contracts.Models;
using Core.Contracts.Services;
using Core.Entities.Database;
using Core.Entities.Models;
using Google.Protobuf.WellKnownTypes;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Core.Contracts.EZCRUD
{
    [ApiController]
    [Produces("application/json")]
    public class EZCRUDEnpoint<C, R, D, Object, Id, Service> : Controller where Id : IComparable where Service : IEZCRUDService<C, R, D, Object, Id>
    {
        protected Func<D, Id> DeleteIdSelector { get; set; } = null!;
        protected Func<R, Id> ReadIdSelector { get; set; } = null!;

        [HttpGet]
        public virtual async Task<IActionResult> Get([FromBody] R id, [FromServices] Service service)
        {
            if (id == null)
            {
                return BadRequest();
            }

            var result = await service.ReadAsync(ReadIdSelector(id));
            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        [HttpPost]
        public virtual async Task<IActionResult> Create([FromBody] C model, [FromServices] Service service)
        {
            if (model == null)
            {
                return BadRequest();
            }

            var result = await service.CreateAsync(model);
            if (result == null)
            {
                return BadRequest();
            }

            return Ok(result);
        }

        [HttpPut]
        public virtual async Task<IActionResult> Update([FromBody] Object model, [FromServices] Service service)
        {
            if (model == null)
            {
                return BadRequest();
            }

            await service.UpdateAsync(model);
            return Ok();
        }

        [HttpDelete]
        public virtual async Task<IActionResult> Delete([FromBody] D model, [FromServices] Service service)
        {
            if (model == null)
            {
                return BadRequest();
            }

            await service.DeleteAsync(DeleteIdSelector(model));
            return Ok();
        }
    }
}
