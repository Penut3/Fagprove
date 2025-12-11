using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.CourseAttendanceDto
{
    public class CourseAttendanceCreateDto
    {
        public bool WasPresent { get; set; }
        public Guid CourseHoursId { get; set; }
        public Guid ParticipantId { get; set; }
    }
}
