using Core.Contracts;
using Core.Contracts.Models;
using Core.Contracts.Services;
using Core.Entities.Database;
using Core.Entities.Models;
using Org.BouncyCastle.Asn1.Ocsp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services
{
    public class ChatService : IChatService
    {
        private readonly IUnitOfWork unitOfWork;

        public ChatService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        public async Task<IServiceResult<List<object>>> AddReadFieldToMessages(List<ChatMessage> messages, int userId)
        {
            int lastMessageId = await unitOfWork.ChatRepository.GetLastReadMessageId(messages.First().ChatId, userId);

            var result = messages.Select(x => new
            {
                x.Id,
                x.ChatId,
                x.Content,
                x.Created,
                x.UserId,
                Read = x.Id <= lastMessageId
            });

            return new ServiceResult<List<object>>(result.Cast<object>().ToList());
        }

        public async Task<IServiceResult<int>> CreateChat(string name, string description, List<int> members, int creator)
        {
            // check if members exist
            var users = members.Select(x => unitOfWork.UserRepository.GetUserByIdAsync(x).GetAwaiter().GetResult());

            if (users.Any(x => x == null))
            {
                return new ServiceResult<int>("Members", "One or more members do not exist");
            }

            Chat chat = new()
            {
                Name = name,
                Description = description,
                ChatMembers = members.Select(m => new ChatMember
                {
                    UserId = m,
                    Joined = DateTime.UtcNow
                }).ToList(),
                CreatorUserId = creator
            };

            await unitOfWork.ChatRepository.Create(chat);

            await unitOfWork.SaveChangesAsync();

            return new ServiceResult<int>(chat.Id);
        }

        public async Task<IServiceResult<Chat>> GetChat(int id)
        {
            var chat = await unitOfWork.ChatRepository.GetChatById(id);

            if (chat == null)
            {
                return new ServiceResult<Chat>("Id", "Chat not found");
            }

            return new ServiceResult<Chat>(chat);
        }

        public async Task<IServiceResult<List<Chat>>> GetChats(int id)
        { 
            var chats = await unitOfWork.ChatRepository.GetChats(id);

            return new ServiceResult<List<Chat>>(chats.ToList());
        }

        public async Task<IServiceResult<List<ChatMessage>>> GetMessages(int chatId, int requester, int count = 10, int start = 0)
        {
            var usr = await unitOfWork.UserRepository.GetUserByIdAsync(requester);
            var chat = await unitOfWork.ChatRepository.GetChatById(chatId);

            if (chat == null)
            {
                return new ServiceResult<List<ChatMessage>>("Id", "Chat not found");
            }

            // check if user is member / owner of chat / admin
            if (chat.CreatorUserId != requester && !chat.ChatMembers!.Any(x => x.UserId == requester) && (usr!.Permissions & UserPermission.Admin) != 0)
            {
                return new ServiceResult<List<ChatMessage>>("User", "User is not member of chat");
            }

            var messages = await unitOfWork.ChatRepository.GetMessages(chatId, count, start);

            return new ServiceResult<List<ChatMessage>>(messages.ToList());
        }

        public async Task<IServiceResult<List<ChatMessage>>> GetMessages(int chatId, int requester, DateTime start, int startCount = 0, int count = 10)
        {
            var usr = await unitOfWork.UserRepository.GetUserByIdAsync(requester);
            var chat = await unitOfWork.ChatRepository.GetChatById(chatId);

            if (chat == null)
            {
                return new ServiceResult<List<ChatMessage>>("Id", "Chat not found");
            }

            // check if user is member / owner of chat / admin
            if (chat.CreatorUserId != requester && !chat.ChatMembers!.Any(x => x.UserId == requester) && (usr!.Permissions & UserPermission.Admin) != 0)
            {
                return new ServiceResult<List<ChatMessage>>("User", "User is not member of chat");
            }
            var messages = await unitOfWork.ChatRepository.GetMessages(chatId, start, startCount, count);

            return new ServiceResult<List<ChatMessage>>(messages.ToList());
        }

        public async Task<IServiceResult> ReadMessage(int chatId, int messageId, int userId)
        {
            await unitOfWork.ChatRepository.ReadMessage(chatId, messageId, userId);

            await unitOfWork.SaveChangesAsync();

            return new ServiceResult();
        }

        public async Task<IServiceResult> SendMessage(int chatId, string content, int sender)
        {
            var chat = await unitOfWork.ChatRepository.GetChatById(chatId);

            if (chat == null)
            {
                return new ServiceResult("Id", "Chat not found");
            }

            // check if user is member / owner of chat / admin
            if (chat.CreatorUserId != sender && !chat.ChatMembers!.Any(x => x.UserId == sender))
            {
                return new ServiceResult<List<ChatMessage>>("User", "User is not member of chat");
            }

            var message = new ChatMessage
            {
                ChatId = chatId,
                Content = content,
                Created = DateTime.UtcNow,
                UserId = sender
            };

            await unitOfWork.ChatRepository.SendMessage(message);

            await unitOfWork.SaveChangesAsync();

            return new ServiceResult();
        }

        
    }
}
