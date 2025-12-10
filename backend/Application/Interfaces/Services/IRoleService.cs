using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces.Services
{
    public interface IRoleService
    {
        Task<Role> CreateRoleAsync(string roleName);
        Task<IEnumerable<Role>> GetAllRoles();
    }
}
