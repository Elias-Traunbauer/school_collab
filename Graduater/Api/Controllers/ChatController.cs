using Api.Helpers;
using Core.Contracts.Services;
using Microsoft.AspNetCore.Mvc;
using Service.Services;
using System.Threading;

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

            var sendResult = await chatService.SendMessage(message.chatId, message.Message, userInfo.User!.Id);

            return Ok(sendResult);
        }

        [HttpGet(nameof(Messages))]
        public async Task<IActionResult> Messages(int chatId, int start, int count, [FromServices] IChatService chatService)
        {
            var userInfo = HttpContext.GetUserInfo();

            var messages = await chatService.GetMessages(chatId, userInfo.User!.Id, count, start);

            return Ok(await chatService.AddReadFieldToMessages(messages.Value!, userInfo.User!.Id));
        }

        [HttpGet(nameof(Messages) + "/since")]
        public async Task<IActionResult> MessagesSince(int chatId, DateTime start, int startCount, int count, [FromServices] IChatService chatService)
        {
            var userInfo = HttpContext.GetUserInfo();

            var messages = await chatService.GetMessages(chatId, userInfo.User!.Id, start, startCount, count);

            return Ok(await chatService.AddReadFieldToMessages(messages.Value!, userInfo.User!.Id));
        }

        [HttpGet(nameof(MyChats))]
        public async Task<IActionResult> MyChats([FromServices] IChatService chatService)
        {
            var userInfo = HttpContext.GetUserInfo();

            var chats = await chatService.GetChats(userInfo.User!.Id);

            return Ok(chats);
        }

        [HttpPost(nameof(Read))]
        public async Task<IActionResult> Read(int chatId, int messageId, [FromServices] IChatService chatService)
        {
            var userInfo = HttpContext.GetUserInfo();

            var result = await chatService.ReadMessage(chatId, messageId, userInfo.User!.Id);

            return Ok(result);
        }

        [HttpGet(nameof(SubscribeToNewMessages))]
        public async Task<IActionResult> SubscribeToNewMessages(CancellationToken cancellationToken)
        {
            HttpResponse resp = Response;

            var chart = ChartService.Instance;
            if (chart == null)
            {
                resp.StatusCode = 500;
                return;
            }

            resp.StatusCode = 200;
            resp.Headers.Add("Content-Type", "text/event-stream");
            resp.Headers.Add("Cache-Control", "no-cache");
            resp.Headers.Add("Connection", "keep-alive");
            resp.Headers.Add("Content-Encoding", "none");
            await resp.BodyWriter.FlushAsync(cancellationToken);


            for (var i = 0; !cancellationToken.IsCancellationRequested; ++i)
            {
                await resp.WriteAsync($"data: {chart.CurrentValue.ToString().Replace(',', '.')}\r\r", cancellationToken);

                await resp.Body.FlushAsync(cancellationToken);

                await Task.Delay(updateFrequency, cancellationToken);
            }

            return;
            return Ok();
        }
    }
}