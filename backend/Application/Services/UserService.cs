using Application.DTOs.SupabaseDto;
using Application.DTOs.UserDto;
using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class UserService : IUserService
    {
        private readonly IBaseRepository<User> _userRepo;
        private readonly IBaseRepository<Role> _roleRepo;
        private readonly ISupabaseService _supabaseService;

        public UserService(IBaseRepository<User> userRepo, IBaseRepository<Role> roleRepo, ISupabaseService supabaseService)
        {
            _userRepo = userRepo;
            _roleRepo = roleRepo;
            _supabaseService = supabaseService;
        }

        public async Task<User?> CreateUserAsync(UserCreateDto userDto)
        {
            //Add validation for exisiting user with same email and existing role
            var role = await _roleRepo.GetById(userDto.RoleId);
            if (role is null)
            {
                // you can throw a custom exception type here if you want
                throw new Exception("Role does not exist.");
            }

            var dbUserName = Guid.NewGuid();
            var supabaseUser = await _supabaseService.CreateAuthUserAsync(new SupabaseCreateUserDto
            {
                Email = userDto.Email,
                Password = userDto.Password,
                UserId = dbUserName,
                RoleId = userDto.RoleId
            });

            var user = new User
            {
                Id = dbUserName,
                Email = userDto.Email,
                RoleId = userDto.RoleId,
                SupabaseId = supabaseUser.Id,
                CreatedAt = DateTime.UtcNow,
                IsDeleted = false

            };
            await _userRepo.Add(user);
            return user;
        }

        public async Task<UserLoginResultDto> LoginAsync(UserLoginDto loginDto)
        {
            var loginResponse = await _supabaseService.SupabaseLoginAsync(loginDto.Email, loginDto.Password);
            if (loginResponse == null)
                throw new UnauthorizedAccessException("Invalid email or password");

            var supabaseId = loginResponse.User?.Id;
            if (string.IsNullOrWhiteSpace(supabaseId))
                throw new UnauthorizedAccessException("Supabase user id missing in response");

            var user = await _userRepo.GetQueryable()
                .FirstOrDefaultAsync(u => u.SupabaseId == supabaseId && !u.IsDeleted);

            if (user == null)
                throw new UnauthorizedAccessException("User not found in local database");

            var roleName = await _roleRepo.GetQueryable()
                .Where(r => r.Id == user.RoleId)
                .Select(r => r.Name)
                .FirstOrDefaultAsync();

            return new UserLoginResultDto
            {
                SupabaseId = supabaseId,
                SupabaseToken = loginResponse.AccessToken,
                RefreshToken = loginResponse.RefreshToken,
                ExpiresIn = loginResponse.ExpiresIn,
                RoleName = roleName
            };
        }

        public async Task<User?> EditUserAsync(UserEditDto userEditDto)
        {
            var user = await _userRepo.GetById(userEditDto.Id);
            if (user == null) return null;

            // Update ONLY if values were provided
            if (!string.IsNullOrWhiteSpace(userEditDto.Email))
                user.Email = userEditDto.Email;

            if (userEditDto.RoleId.HasValue && userEditDto.RoleId.Value != Guid.Empty)
                user.RoleId = userEditDto.RoleId.Value;

            await _userRepo.Update(user);

            // Update user in Supabase (only the same provided fields)
            await _supabaseService.UpdateSupabaseUser(new SupabaseUpdateUserDto
            {
                SupabaseId = user.SupabaseId,
                UserId = userEditDto.Id,                  // unchanged, required
                Email = userEditDto.Email,                // nullable → only included if has value
                RoleId = userEditDto.RoleId               // nullable → only included if has value
            });

            return user;
        }


    }
}
