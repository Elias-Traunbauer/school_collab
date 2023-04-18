﻿using Core.Contracts.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Contracts.Services
{
    public interface IUserService
    {
        Task<IServiceResult> LoginAsync(ILoginPayload loginModel);
    }
}
