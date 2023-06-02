using System.ComponentModel.DataAnnotations;

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