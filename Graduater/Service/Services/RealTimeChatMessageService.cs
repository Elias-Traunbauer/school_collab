using Core.Contracts;
using Core.Contracts.Models;
using Core.Contracts.Services;
using Core.Entities.Database;
using Core.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services
{
    public class RealTimeChatMessageService : IRealTimeChatMessageService
    {
        private Semaphore eventHandlerAccess = new(1, 1);
        private Dictionary<int, Action<ChatMessage>> eventHandlers = new();



        public async Task<IServiceResult> NotifyChat(int chatId, ChatMessage message, IUnitOfWork uow)
        {
            var chat = await uow.ChatRepository.GetChatById(chatId);
            if (chat == null)
            {
                return new ServiceResult("chatId", "Chat not found");
            }
            var userIds = chat.ChatMembers!.Select(c => c.UserId).Distinct().ToList();
            List<Action<ChatMessage>> handlers = new();
            try
            {
                eventHandlerAccess.WaitOne();
                foreach (var item in userIds)
                {
                    if (eventHandlers.ContainsKey(item))
                    {
                        handlers.Add(eventHandlers[item]);
                    }
                }
            }
            catch (Exception) { }
            finally
            {
                eventHandlerAccess.Release();
            }
            foreach (var item in handlers)
            {
                item(message);
            }
            return new ServiceResult();
        }

        public Task<IServiceResult> SubscribeToMessages(int userId, Action<ChatMessage> callback)
        {
            try
            {
                eventHandlerAccess.WaitOne();
                eventHandlers[userId] = callback;
            }
            catch (Exception) { }
            finally
            {
                eventHandlerAccess.Release();
            }

            return Task.FromResult<IServiceResult>(new ServiceResult());
        }

        public Task<IServiceResult> UnsubscribeFromMessages(int userId)
        {
            try
            {
                eventHandlerAccess.WaitOne();
                eventHandlers.Remove(userId);
            }
            catch (Exception) { }
            finally
            {
                eventHandlerAccess.Release();
            }

            return Task.FromResult<IServiceResult>(new ServiceResult());
        }
    }
}
