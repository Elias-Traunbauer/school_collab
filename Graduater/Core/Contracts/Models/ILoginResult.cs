﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Contracts.Models
{
    public interface ILoginResult
    {
        public IServiceResult ServiceResult { get; set; }
        public string? AccessToken { get; set; }
        public string? RefreshToken { get; set; }
    }
}