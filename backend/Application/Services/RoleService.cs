using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using Domain.Entities;
using Microsoft.Extensions.Logging.Console;

namespace Application.Services
{
    public class RoleService : IRoleService
    {
        private readonly IBaseRepository<Role> _roleRepo;
       

        public RoleService(IBaseRepository<Role> roleRepo)
        {
            _roleRepo = roleRepo;
        }

        public async Task<Role> CreateRoleAsync(string roleName)
        {


            var role = new Role
            {
                Id = Guid.NewGuid(),
                Name = roleName,
                CreatedAt = DateTime.UtcNow
            };

            await _roleRepo.Add(role);
            await _roleRepo.SaveChanges();
            return role;
        }

        public async Task<IEnumerable<Role>> GetAllRoles()
        {
            return await _roleRepo.GetAll();
        }
    }
}
