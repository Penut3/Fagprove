using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class User : BaseEntity
    {
        public string Email { get; set; } = null!;
        public string SupabaseId { get; set; }
        public Guid RoleId { get; set; }
        public Role Role { get; set; } = null!;
    }
}
