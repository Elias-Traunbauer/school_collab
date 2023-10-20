using Api.Helpers;
using Core.Contracts.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class ChatController : Controller
    {
        [HttpGet("{id}")]
        public async Task<IActionResult> GetChat(int id, [FromServices] IChatService chatService)
        {
            var chat = await chatService.GetChat(id);

            return Ok(chat);
        }

        public record CreateChatRequest(string Name, string Description, List<int> Members);

        [HttpPost]
        public async Task<IActionResult> CreateChat([FromBody] CreateChatRequest body, [FromServices] IChatService chatService)
        {
            var user = HttpContext.GetUserInfo().User!;
            var createResult = await chatService.CreateChat(body.Name, body.Description, body.Members, user.Id);

            return Ok(createResult);
        }

        public record SendMessageRequest(int chatId, string Message);

        [HttpPost("message")]
        public async Task<IActionResult> SendMessage([FromBody]SendMessageRequest message, [FromServices] IChatService chatService)
        {
            var userInfo = HttpContext.GetUserInfo();

            var sendResult = await chatService.SendMessage(message.chatId, message.Message, userInfo.User.Id);

            return Ok(sendResult);
        }

        [HttpGet(nameof(Messages))]
        public async Task<IActionResult> Messages(int chatId, int start, int count, [FromServices] IChatService chatService)
        {
            var userInfo = HttpContext.GetUserInfo();

            var messages = await chatService.GetMessages(chatId, userInfo.User!.Id, count, start);

            return Ok(messages);
        }

        [HttpGet(nameof(Messages) + "/since")]
        public async Task<IActionResult> MessagesSince(int chatId, DateTime start, int startCount, int count, [FromServices] IChatService chatService)
        {
            var userInfo = HttpContext.GetUserInfo();

            var messages = await chatService.GetMessages(chatId, userInfo.User!.Id, start, startCount, count);

            return Ok(messages);
        }
    }
}