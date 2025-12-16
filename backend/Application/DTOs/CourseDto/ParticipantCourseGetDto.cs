using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.CourseDto
{
    public class ParticipantCourseGetDto
    {
        public string Name { get; set; } = null!;
        public DateTime JoinedAt { get; set; }
    }

}
