using Core.Entities.Database;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Contracts.Models
{
    public interface IAssignmentPostPayload
    {
        string Title { get; set; }
        string Description { get; set; }
        string Content { get; set; }
        DateTime Due { get; set; }
        int GroupId { get; set; }
        int SubjectId { get; set; }
    }
}
