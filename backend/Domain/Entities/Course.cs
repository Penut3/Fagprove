using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Course : BaseEntity
    {
        public string Name { get; set; } = null!;
        public Guid InstructorId { get; set; }
        public User User { get; set; } = null!;
    }
}
