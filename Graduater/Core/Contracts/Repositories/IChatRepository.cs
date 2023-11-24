using Core.Contracts.Entities;
using Core.Entities.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Contracts.Repositories
{
    public interface IChatRepository
    {
        Task Create(Chat chat);
        Task Delete(int chatId);
        Task SendMessage(ChatMessage chat);
        Task<IEnumerable<Chat>> GetAllForUser(User user);
        Task<IEnumerable<ChatMessage>> GetMessages(int chatId, int count = 10, int start = 0);
        Task<IEnumerable<ChatMessage>> GetMessages(int chatId, DateTime start, int startCount = 0, int count = 10);
        Task JoinChat(int userId, int chatId);
        Task<Chat?> GetChatById(int chatId);
        Task<IEnumerable<Chat>> GetChats(int id);
        Task<int> GetLastReadMessageId(int chatId, int userId);
        Task ReadMessage(int chatId, int messageId, int userId);
    }
}
