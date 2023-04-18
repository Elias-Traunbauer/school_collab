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

        [Timestamp]
        public byte[]? RowVersion { get; set; }

        public virtual ICollection<Report>? Reports { get; set; }
    }
}
