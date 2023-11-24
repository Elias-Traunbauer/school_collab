using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities.Database
{
    public class AssignmentFile
    {
        public int Id { get; set; }

        public int AssignmentId { get; set; }

        public int AssignmentIdInstruction { get; set; }

        public int FileId { get; set; }

        [ForeignKey(nameof(FileId))]
        public virtual File File { get; set; } = null!;
    }
}
