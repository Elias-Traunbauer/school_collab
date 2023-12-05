using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Trauni.EntityFramework.LargeBlobs.Models
{

    public class EFLargeBlob
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public long Size { get; set; }
    }
}
