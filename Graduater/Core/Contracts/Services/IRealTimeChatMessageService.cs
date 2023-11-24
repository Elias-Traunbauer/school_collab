using Core.Contracts.Models;
using Core.Entities.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Contracts.Services
{
    public interface IRealTimeChatMessageService
    {
        public Task<IServiceResult> NotifyChat(int chatId, ChatMessage message, IUnitOfWork uow);
        public Task<IServiceResult> SubscribeToMessages(int userId, Action<ChatMessage> callback);
        public Task<IServiceResult> UnsubscribeFromMessages(int userId);
    }
}
