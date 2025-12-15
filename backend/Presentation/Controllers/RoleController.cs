using Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Presentation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoleController : ControllerBase
    {
        private readonly IRoleService _roleService;

        public RoleController(IRoleService roleService)
        {
            _roleService = roleService;
        }

        [HttpPost]
        [Authorize(Policy = "Kontor")]
        public async Task<IActionResult> CreateRole(string roleName)
        {
            var role = await _roleService.CreateRoleAsync(roleName);
            return Ok(role);
        }

        [HttpGet]
        [Authorize(Policy = "Kontoransatt")]
        public async Task<IActionResult> GetRoles()
        {
            var roles = await _roleService.GetAllRoles();
            return Ok(roles);
        }
    }
}
