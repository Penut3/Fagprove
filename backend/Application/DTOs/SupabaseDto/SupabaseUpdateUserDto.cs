using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.SupabaseDto
{
    public class SupabaseUpdateUserDto
    {
        public string SupabaseId { get; set; }
        public Guid? UserId { get; set; }   // now nullable
        public string? Email { get; set; }  // nullable too, for optional updates
        public Guid? RoleId { get; set; }   // now nullable

    }
}
