using Shva.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Shva.Application.Interfaces
{
    public interface IUserRepository
    {
        Task<User?> GetByEmailAsync(string email);

        Task<User> CreateAsync(User user);
    }
}