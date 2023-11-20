using Core.Contracts.Entities;
using Core.Contracts.Repositories;
using Core.Entities.Database;
using System;
using System.Collections.Generic;
using System.Data.Entity;
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

        public async Task Create(Chat chat)
        {
            // create chat
            await _context.Chats.AddAsync(chat);
        }

        public async Task Delete(int chatId)
        {
            var chat = await _context.Chats.FindAsync(chatId);
            _context.Chats.Remove(chat!);
        }

        public async Task<IEnumerable<Chat>> GetAllForUser(User user)
        {
            var chats = _context.Chats.Where(c => c.ChatMembers!.Select(x => x.UserId).Contains(user.Id));
            return chats;
        }

        public Task<Chat?> GetChatById(int chatId)
        {
            var chat = _context.Chats.Include(c => c.ChatMembers).FirstOrDefault(c => c.Id == chatId);

            return Task.FromResult(chat);
        }

        public async Task<IEnumerable<ChatMessage>> GetMessages(int chatId, int count = 10, int start = 0)
        {
            var messages = _context.ChatMessages.Where(m => m.ChatId == chatId).Skip(start).Take(count);
            return messages;
        }

        public async Task<IEnumerable<ChatMessage>> GetMessages(int chatId, DateTime start, int startCount = 0, int count = 10)
        {
            var messages = _context.ChatMessages.Where(m => m.ChatId == chatId && m.Created > start).Skip(startCount).Take(count);
            return messages;
        }

        public async Task JoinChat(User user, Chat chat)
        {

            var chatMember = new ChatMember
            {
                ChatId = chat.Id,
                UserId = user.Id,
                Joined = DateTime.UtcNow
            };
            await _context.ChatMembers.AddAsync(chatMember);
        }

        public async Task SendMessage(ChatMessage chat)
        {

            await _context.ChatMessages.AddAsync(chat);
        }
    }
}
