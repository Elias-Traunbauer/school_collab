using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities.Database
{
    public class PollVote : DatabaseEntity
    {
        public int PollOptionId { get; set; }
        public PollOption PollOption { get; set; } = null!;

        public int UserId { get; set; }
        public User User { get; set; } = null!;

        public int Value { get; set; }
    }
}
