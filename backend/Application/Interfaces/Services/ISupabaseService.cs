using Application.DTOs.SupabaseDto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Application.Interfaces.Services
{
    public interface ISupabaseService
    {
        Task<SupabaseUserDto> CreateAuthUserAsync(SupabaseCreateUserDto userDto);
        Task<SupabaseLoginResponse> SupabaseLoginAsync(string email, string password);

        Task UpdateSupabaseUser(SupabaseUpdateUserDto userDto);
    }
}
