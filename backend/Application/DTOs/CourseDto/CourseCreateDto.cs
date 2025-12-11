using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.CourseDto
{
    public class CourseCreateDto
    {
        public string Name { get; set; } = null!;
        public Guid UserId { get; set; }

        [Required]
        public DateTime[] CourseHourDates { get; set; } = null!;
    }
}
