using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.SupabaseDto
{
    public record SupabaseCreateUserDto
    {
        public Guid UserId { get; set; }
        public string Email { get; set; } = null!;
        public Guid RoleId { get; set; }
        public string Password { get; set; } = null!;

    }
}
