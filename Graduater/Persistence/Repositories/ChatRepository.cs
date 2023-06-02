using Core.Contracts.Entities;
using Core.Contracts.Repositories;
using Core.Entities.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Repositories
{

    public class ChatRepository : IChatRepository
    {
        private readonly ApplicationDbContext _context;

        public ChatRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public Task Create(Chat chat)
        {
            throw new NotImplementedException();
        }

        public Task Delete(int chatId)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Chat>> GetAllForUser(User user)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<ChatMessage>> GetMessages(int chatId, int count = 10, int start = 0)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<ChatMessage>> GetMessages(int chatId, DateTime start, int count = 10)
        {
            throw new NotImplementedException();
        }

        public Task JoinChat(User user, Chat chat)
        {
            throw new NotImplementedException();
        }

        public Task SendMessage(ChatMessage chat)
        {
            throw new NotImplementedException();
        }
    }
}
