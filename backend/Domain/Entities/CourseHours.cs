using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class CourseHours : BaseEntity
    {
        public string? Name { get; set; }
        public Guid CourseId { get; set; }
        public Course Course { get; set; } = null!;
        public DateTime StartTime { get; set; }
        public int DurationInMinutes { get; set; }
    }
}
