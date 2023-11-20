using Core.Contracts.Models;
using Core.Entities.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Contracts.Services
{
    public interface IChatService
    {
        Task<IServiceResult<int>> CreateChat(string name, string description, List<int> members);
        Task<IServiceResult> SendMessage(int chatId, string content, int sender);
        Task<IServiceResult<Chat>> GetChat(int id);
        Task<IServiceResult<List<ChatMessage>>> GetMessages(int chatId, int requester, int count = 10, int start = 0);
        Task<IServiceResult<List<ChatMessage>>> GetMessages(int chatId, int requester, DateTime start, int startCount = 0, int count = 10);
    }
}
