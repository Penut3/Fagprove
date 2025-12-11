using Application.DTOs.CourseAttendanceDto;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces.Services
{
    public interface ICourseAttendanceService
    {
        Task<CourseAttendance> CreateCourseAttendanceAsync(CourseAttendanceCreateDto courseDto);
        Task<IEnumerable<CourseAttendance>> GetCourseAttendancesByCourseHoursIdAsync(Guid courseHoursId);
        Task<IEnumerable<Participant>> GetLackingCourseAttendancesByCourseHoursIdAsync(Guid courseHoursId);
    }
}
