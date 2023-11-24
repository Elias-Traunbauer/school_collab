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
        Task<IServiceResult<int>> CreateChat(string name, string description, List<int> members, int creator);
        Task<IServiceResult> SendMessage(int chatId, string content, int sender, int? replyToMessageId);
        Task<IServiceResult<Chat>> GetChat(int id);
        Task<IServiceResult<List<ChatMessage>>> GetMessages(int chatId, int requester, int count = 10, int start = 0);
        Task<IServiceResult<List<ChatMessage>>> GetMessages(int chatId, int requester, DateTime start, int startCount = 0, int count = 10);
        Task<IServiceResult<List<Chat>>> GetChats(int id);
        Task<IServiceResult<List<object>>> AddMessageMetadata(List<ChatMessage> messages, int userId);
        Task<IServiceResult> ReadMessage(int chatId, int messageId, int userId);
    }
}
