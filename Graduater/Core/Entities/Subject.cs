using System;
using System.Collections.Generic;

namespace Core.Entities;

public class Subject : DatabaseEntity
{
    public string Name { get; set; } = null!;

    public virtual ICollection<Assignment> Assignments { get; set; } = new List<Assignment>();
}
