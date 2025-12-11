using Application.DTOs.UserDto;
using Application.Interfaces.Repositories;
using Application.Interfaces.Services;

using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Presentation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        

        public UsersController(IUserService userService)
        {
            _userService = userService;
           
        }

        [HttpPost("CreateUser")]
        public async Task<ActionResult<User>> CreateUser([FromBody] UserCreateDto userDto)
        {
            if (userDto == null) return BadRequest("Invalid request");

            var user = await _userService.CreateUserAsync(userDto);

            if (user == null) return BadRequest("Could not create user");

            return CreatedAtAction(nameof(CreateUser), new { id = user.Id }, user);
        }


        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<ActionResult<object>> Login([FromBody] UserLoginDto userLoginDto)
        {
            if (userLoginDto is null)
                return BadRequest("Invalid request");

            var login = await _userService.LoginAsync(userLoginDto);
            if (login is null)
                return Unauthorized("Invalid email or password");

            // ------------ COOKIE SETTINGS ------------
            var accessCookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Path = "/",
                Expires = DateTimeOffset.UtcNow.AddMinutes(60)
            };

            // Can add refresh token cookie here if needed
            Response.Cookies.Append("AccessToken", login.SupabaseToken, accessCookieOptions);


            return Ok(new
            {
                supabase_id = login.SupabaseId,
                expires_in = login.ExpiresIn,
                role_name = login.RoleName
            });
        }

        [HttpPut("EditUser")]
        public async Task<IActionResult> EditUser([FromBody] UserEditDto userEditDto)
        {
            if (userEditDto == null)
                return BadRequest("Invalid user data");

            var user = await _userService.EditUserAsync(userEditDto);
            if (user == null)
                return NotFound("User not found");

            return Ok(user);
        }

    }
}
