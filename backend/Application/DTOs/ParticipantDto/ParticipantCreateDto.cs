using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.ParticipantDto
{
    public record ParticipantCreateDto
    {
        public string Name { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;

        [Required]
        public Guid[] CourseIds { get; set; } = null!;
    }
}
