using Core.Contracts.Services;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities.Database
{
    public class SummaryFile : DatabaseEntity
    {
        public int SummaryId { get; set; }

        public int FileId { get; set; }

        public bool Instruction { get; set; }

        [ForeignKey(nameof(FileId))]
        public virtual File File { get; set; } = null!;
    }

    public class SummaryFileUpdatePayload : IConvertible<SummaryFile>
    {
        public int? Id { get; set; }
        public int SummaryId { get; set; }
        public int FileId { get; set; }

        public SummaryFile Convert()
        {
            return new SummaryFile
            {
                Id = Id ?? 0,
                FileId = FileId,
                SummaryId = SummaryId
            };
        }
    }
}
