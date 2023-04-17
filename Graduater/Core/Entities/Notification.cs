﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities;

public class Notification : DatabaseEntity
{
    public int UserId { get; set; }

    public string Link { get; set; } = null!;

    public string Content { get; set; } = null!;

    public DateTime Created { get; set; }

    [ForeignKey(nameof(UserId))]
    public virtual User User { get; set; } = null!;

    public bool IsRead { get; set; }
}
