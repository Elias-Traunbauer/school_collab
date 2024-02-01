using Core.Contracts.Services;
using Swashbuckle.AspNetCore.Annotations;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace Core.Entities.Database
{
    public class Summary : DatabaseEntity
    {
        public string Title { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public string Content { get; set; } = string.Empty;

        public int SubjectId { get; set; }

        [NotMapped]
        public int? Votes { get; set; } = null;

        [SwaggerSchema(ReadOnly = true)]
        [ForeignKey(nameof(SubjectId))]
        public Subject? Subject { get; set; } = null!;

        [SwaggerSchema(ReadOnly = true)]
        [ForeignKey(nameof(File.OwnerId))]
        public List<SummaryFile> Files { get; set; } = new List<SummaryFile>();
    }

    public class SummaryUpdatePayload : IConvertible<Summary>
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public int SubjectId { get; set; }
        public List<SummaryFileUpdatePayload> Files { get; set; } = new List<SummaryFileUpdatePayload>();
        public Guid Version { get; set; }

        public Summary Convert()
        {
            return new Summary
            {
                Id = Id,
                Title = Title,
                Description = Description,
                Content = Content,
                SubjectId = SubjectId,
                Version = Version,
                Files = Files.Select(x => x.Convert()).ToList()
            };
        }
    }
}
