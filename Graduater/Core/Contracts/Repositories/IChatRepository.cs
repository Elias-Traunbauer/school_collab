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
        Task JoinChat(User user, Chat chat);
    }
}
