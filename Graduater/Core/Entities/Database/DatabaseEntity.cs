using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities.Database
{
    public abstract class DatabaseEntity
    {
        [Key]
        public int Id { get; set; }

        [ConcurrencyCheck]
        public Guid Version { get; set; }

        public virtual ICollection<Report>? Reports { get; set; }
    }
}
