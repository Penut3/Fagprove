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


        //[HttpPost("login")]
        //[AllowAnonymous]
        //public async Task<ActionResult<object>> Login([FromBody] UserLoginDto userLoginDto)
        //{
        //    if (userLoginDto is null) return BadRequest("Invalid request");

        //    var login = await _userService.LoginAsync(userLoginDto);
        //    if (login is null) return Unauthorized("Invalid email or password");

        //    if (userLoginDto.RememberMe)
        //    {
        //        // Set ONLY the refresh cookie (HttpOnly). Omit Domain => host-only to SSO.
        //        var refreshCookie = new CookieOptions
        //        {
        //            HttpOnly = true,
        //            Secure = true,
        //            SameSite = SameSiteMode.None, // cross-site fetch from SPA
        //            Path = "/",
        //            Expires = DateTimeOffset.UtcNow.AddDays(30)
        //            // Domain = null  // host-only; keep it that way
        //        };

        //        Response.Cookies.Append("RefreshToken", login.RefreshToken, refreshCookie);
        //    }

        //    // Return the ACCESS token in JSON so the SPA can hold it in memory.
        //    // IMPORTANT: this must be the RAW JWT (xxxxx.yyyyy.zzzzz), not the sb-... base64 blob.
        //    return Ok(new
        //    {
        //        access_token = login.SupabaseToken,
        //        expires_in = login.ExpiresIn,
        //        user = new { id = login.Id, email = login.Email, supabaseId = login.SupabaseId }
        //    });
        //}

    }
}
