using Core.Entities.Database;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Contracts.Models
{
    public class AssignmentPostPayload : IAssignmentPostPayload
    {
        public string Title { get; set; } = "";
        public string Description { get; set; } = "";
        public string Content { get; set; } = "";
        public DateTime Due { get; set; }
        public int GroupId { get; set; }
        public int SubjectId { get; set; }
    }
}
