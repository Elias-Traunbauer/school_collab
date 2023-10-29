using Api.Helpers;
using Core.Contracts.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
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

        public record SendMessageRequest(int ChatId, string Message, int? ReplyToMessageId);

        [HttpPost("message")]
        public async Task<IActionResult> SendMessage([FromBody]SendMessageRequest message, [FromServices] IChatService chatService)
        {
            var userInfo = HttpContext.GetUserInfo();

            var sendResult = await chatService.SendMessage(message.ChatId, message.Message, userInfo.User!.Id, message.ReplyToMessageId);

            return Ok(sendResult);
        }

        [HttpGet(nameof(Messages))]
        public async Task<IActionResult> Messages(int chatId, int start, int count, [FromServices] IChatService chatService)
        {
            var userInfo = HttpContext.GetUserInfo();

            var messages = await chatService.GetMessages(chatId, userInfo.User!.Id, count, start);

            return Ok(await chatService.AddMessageMetadata(messages.Value!, userInfo.User!.Id));
        }

        [HttpGet(nameof(Messages) + "/since")]
        public async Task<IActionResult> MessagesSince(int chatId, DateTime start, int startCount, int count, [FromServices] IChatService chatService)
        {
            var userInfo = HttpContext.GetUserInfo();

            var messages = await chatService.GetMessages(chatId, userInfo.User!.Id, start, startCount, count);

            return Ok(await chatService.AddMessageMetadata(messages.Value!, userInfo.User!.Id));
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
        public async Task SubscribeToNewMessages([FromServices] IRealTimeChatMessageService realTimeChatMessageService, CancellationToken cancellationToken)
        {
            var user = HttpContext.GetUserInfo().User!;

            HttpResponse resp = Response;

            if (user == null)
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

            await realTimeChatMessageService.SubscribeToMessages(user.Id, async (message) =>
            {
                await resp.WriteAsync($"data: " + JsonConvert.SerializeObject(new
                {
                    message.User,
                    message.Content,
                    message.ChatId,
                    message.Created
                }) + "\r\r", cancellationToken);

                await resp.Body.FlushAsync(cancellationToken);
            });

            for (var i = 0; !cancellationToken.IsCancellationRequested && !HttpContext.RequestAborted.IsCancellationRequested; ++i)
            {
                await Task.Delay(1000, cancellationToken);
            }

            await realTimeChatMessageService.UnsubscribeFromMessages(user.Id);

            return;
        }
    }
}