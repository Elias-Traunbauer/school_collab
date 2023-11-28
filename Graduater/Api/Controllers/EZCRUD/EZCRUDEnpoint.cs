using Core.Contracts.Models;
using Core.Contracts.Services;
using Core.Entities.Database;
using Core.Entities.Models;
using Google.Protobuf.WellKnownTypes;
using Microsoft.AspNetCore.Mvc;
using Service.Services.EZCRUDServices;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Core.Contracts.EZCRUD
{
    /// <summary>
    /// EZCRUD is a system that enables the creation of CRUD endpoints with minimal code.
    /// All you need to do is to create a controller that inherits from EZCRUDEnpoint.
    /// In order to do that, you need to create a service that inherits from IEZCRUDService.
    /// It is important to set the Properties DeleteIdSelector and ReadIdSelector to a function that selects the Id from the Delete and Read Payloads.
    /// This overload allows you to specify the Delete and Read Payloads.
    /// </summary>
    /// <typeparam name="C">Object Creation Payload</typeparam>
    /// <typeparam name="R">Object Read Payload</typeparam>
    /// <typeparam name="D">Object Delete Payload</typeparam>
    /// <typeparam name="Object">The Object to CRUD</typeparam>
    /// <typeparam name="Id">The Type of Primary Key of the Object</typeparam>
    /// <typeparam name="Service">Your EZCRUDService</typeparam>
    [ApiController]
    [Produces("application/json")]
    [Consumes("application/json")]
    public class EZCRUDEnpoint<C, R, D, Object, Id, Service> : Controller where Id : IComparable where Service : IEZCRUDService<C, Object, Id>
    {
        private Func<D, Id> DeleteIdSelector { get; set; } = null!;
        private Func<R, Id> ReadIdSelector { get; set; } = null!;

        public EZCRUDEnpoint(Func<D, Id> deleteIdSelector, Func<R, Id> readIdSelector)
        {
            DeleteIdSelector = deleteIdSelector;
            ReadIdSelector = readIdSelector;
        }

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

    /// <summary>
    /// EZCRUD is a system that enables the creation of CRUD endpoints with minimal code.
    /// All you need to do is to create a controller that inherits from EZCRUDEnpoint.
    /// In order to do that, you need to create a service that inherits from IEZCRUDService.
    /// It is important to set the Properties DeleteIdSelector and ReadIdSelector to a function that selects the Id from the Delete and Read Payloads.
    /// </summary>
    /// <typeparam name="C">Object Creation Payload</typeparam>
    /// <typeparam name="Object">The Object to CRUD</typeparam>
    /// <typeparam name="Id">The Type of Primary Key of the Object</typeparam>
    /// <typeparam name="Service">Your EZCRUDService</typeparam>
    [ApiController]
    [Produces("application/json")]
    [Consumes("application/json")]
    public class EZCRUDEnpoint<C, Object, Id, Service> : Controller where Id : IComparable where Service : IEZCRUDService<C, Object, Id>
    {
        public EZCRUDEnpoint()
        {

        }

        public record ReadPayload(Id Id);

        [HttpGet]
        public virtual async Task<IActionResult> Get([FromBody] ReadPayload readPayload, [FromServices] Service service)
        {
            if (readPayload == null)
            {
                return BadRequest();
            }

            var result = await service.ReadAsync(readPayload.Id);
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

        public record DeletePayload(Id Id);

        [HttpDelete]
        public virtual async Task<IActionResult> Delete([FromBody] DeletePayload model, [FromServices] Service service)
        {
            if (model == null)
            {
                return BadRequest();
            }

            await service.DeleteAsync(model.Id);
            return Ok();
        }
    }
}
