using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.CourseAttendanceDto
{
    public record CourseAttendanceGetDto
    {
        public Guid Id { get; set; }
        public Guid CourseHoursId { get; set; }
        public Guid ParticipantId { get; set; }
        public string ParticipantName { get; set; } = null!;
        public bool WasPresent { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool IsDeleted { get; set; }
    }

}
