using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Contracts
{
    public interface IUnitOfWork
    {
        public IUserRepository UserRepository { get; }
        public IAssignmentRepository AssignmentRepository { get; }

        public Task<bool> SaveChangesAsync();
    }
}
