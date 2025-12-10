using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.UserDto
{
    public class UserLoginResultDto
    {
        public string SupabaseId { get; set; }
        public string SupabaseToken { get; set; }

        public string RefreshToken { get; set; }

        public int ExpiresIn { get; set; }

        public string? RoleName { get; set; }
    }
}
