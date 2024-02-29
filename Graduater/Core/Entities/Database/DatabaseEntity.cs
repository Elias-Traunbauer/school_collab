using Swashbuckle.AspNetCore.Annotations;
using System.ComponentModel.DataAnnotations;

namespace Core.Entities.Database
{
    public abstract class DatabaseEntity
    {
        [Key]
        public int Id { get; set; }

        [ConcurrencyCheck]
        public Guid Version { get; set; }

        [ScaffoldColumn(false)]
        public virtual ICollection<Report>? Reports { get; set; }
    }
}