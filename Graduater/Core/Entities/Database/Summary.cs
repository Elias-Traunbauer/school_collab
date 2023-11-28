using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities.Database
{
    public class Summary : DatabaseEntity
    {
        public string Title { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public string Content { get; set; } = string.Empty;

        [ForeignKey(nameof(File.OwnerId))]
        public List<File> Files { get; set; } = new List<File>();
    }
}
