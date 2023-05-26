using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class ChatController : Controller
    {
        [HttpGet("{id}")]
        public async Task<IActionResult> GetChat(int id)
        {
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> CreateChat()
        {
            return Ok();
        }

        [HttpPost("message")]
        public async Task<IActionResult> SendMessage(string message)
        {
            return Ok();
        }
    }
}