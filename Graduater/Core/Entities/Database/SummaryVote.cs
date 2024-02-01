using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities.Database
{
    public class SummaryVote : DatabaseEntity
    {
        public int SummaryId { get; set; }
        public Summary Summary { get; set; } = null!;

        public int UserId { get; set; }
        public User User { get; set; } = null!;

        public int Value { get; set; }
    }
}
