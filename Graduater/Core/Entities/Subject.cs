using System;
using System.Collections.Generic;

namespace Core.Entities;

public partial class Subject
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<Assignment> Assignments { get; set; } = new List<Assignment>();
}
