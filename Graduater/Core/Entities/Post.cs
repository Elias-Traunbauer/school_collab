using System;
using System.Collections.Generic;

namespace Core.Entities;

public partial class Post
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public string Title { get; set; } = null!;

    public string Content { get; set; } = null!;

    public DateTime DateCreated { get; set; }

    public virtual ICollection<PostComment> PostComments { get; set; } = new List<PostComment>();

    public virtual ICollection<PostFile> PostFiles { get; set; } = new List<PostFile>();

    public virtual ICollection<PostReport> PostReports { get; set; } = new List<PostReport>();

    public virtual User User { get; set; } = null!;
}
