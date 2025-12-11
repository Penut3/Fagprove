using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.UserDto
{
    public class UserEditDto
    {
        public Guid Id { get; set; }
        public string? Email { get; set; }
        public Guid? RoleId { get; set; }
    }
}
