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

        public void Create(ChatMessage message)
        {
            _context.ChatMessages.Add(message);
            _context.SaveChanges();
        }

        public void Delete(int messageId)
        {
            var messageToDelete = _context.ChatMessages.FirstOrDefault(m => m.Id == messageId);
            if (messageToDelete != null)
            {
                _context.ChatMessages.Remove(messageToDelete);
                _context.SaveChanges();
            }
        }

        public IChat Get(int messageId)
        {
            return _context.Chats.FirstOrDefault(m => m.Id == messageId);
        }

        public void Send(ChatMessage message)
        {
            _context.ChatMessages.Add(message);
            _context.SaveChanges();
        }
    }
}
