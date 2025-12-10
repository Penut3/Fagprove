using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class CourseAttendance : BaseEntity
    {
        public Guid CourseHoursId { get; set; }
        public CourseHours CourseHours { get; set; } = null!;
        public Guid ParticipantId { get; set; }
        public Participant Participant { get; set; } = null!;
        public bool WasPresent { get; set; }
    }
}
