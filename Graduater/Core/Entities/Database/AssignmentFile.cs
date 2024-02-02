using Core.Contracts.Services;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities.Database
{
    public class AssignmentFile : DatabaseEntity
    {
        public int AssignmentId { get; set; }

        public int FileId { get; set; }

        public bool Instruction { get; set; }

        [ForeignKey(nameof(FileId))]
        public virtual File File { get; set; } = null!;
    }

    public class AssignmentFileUpdatePayload : IConvertible<AssignmentFile>
    {
        public int? Id { get; set; }
        public int AssignmentId { get; set; }
        public int FileId { get; set; }
        public bool Instruction { get; set; }

        public AssignmentFile Convert()
        {
            return new AssignmentFile
            {
                Id = Id ?? 0,
                AssignmentId = AssignmentId,
                FileId = FileId,
                Instruction = Instruction
            };
        }
    }
}
