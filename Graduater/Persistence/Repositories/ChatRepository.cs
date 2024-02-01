using Core.Contracts.Entities;
using Core.Contracts.Repositories;
using Core.Entities.Database;
using Microsoft.EntityFrameworkCore;
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

        public async Task<IEnumerable<Chat>> GetChats(int id)
        {
            var chats = _context.Chats.Include(x => x.ChatMembers).Where(c => c.ChatMembers!.Select(x => x.UserId).Contains(id) || c.CreatorUserId == id);
            return chats;
        }

        public async Task<int> GetLastReadMessageId(int chatId, int userId)
        {
            var lastReadMessage = await _context.ChatMembers.Where(x => x.UserId == userId && x.ChatId == chatId).FirstOrDefaultAsync();
            return lastReadMessage?.LastSeenMessageId ?? 0;
        }

        public async Task<IEnumerable<ChatMessage>> GetMessages(int chatId, int count = 10, int start = 0)
        {
            var messages = _context.ChatMessages.Where(m => m.ChatId == chatId).OrderByDescending(x => x.Created).Skip(start).Take(count);
            return messages;
        }

        public async Task<IEnumerable<ChatMessage>> GetMessages(int chatId, DateTime start, int startCount = 0, int count = 10)
        {
            var messages = _context.ChatMessages.Where(m => m.ChatId == chatId && m.Created > start).Skip(startCount).Take(count);
            return messages;
        }

        public async Task JoinChat(int userId, int chatId)
        {
            var chatMember = new ChatMember
            {
                ChatId = chatId,
                UserId = userId,
                Joined = DateTime.UtcNow
            };
            await _context.ChatMembers.AddAsync(chatMember);
        }

        public async Task ReadMessage(int chatId, int messageId, int userId)
        {
            var chatMember = await _context.ChatMembers.Where(x => x.UserId == userId && x.ChatId == chatId).FirstOrDefaultAsync();
            if (chatMember == null)
            {
                return;
            }
            chatMember.LastSeenMessageId = messageId;
        }

        public async Task SendMessage(ChatMessage chat)
        {

            await _context.ChatMessages.AddAsync(chat);
        }
    }
}
