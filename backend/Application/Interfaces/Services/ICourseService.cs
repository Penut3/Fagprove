using Application.DTOs.CourseDto;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces.Services
{
    public interface ICourseService
    {
        Task<Course> CreateCourseAsync(CourseCreateDto courseDto);
        Task<IEnumerable<Course>> GetCoursesByUserIdAsync(Guid userId);
        Task<IEnumerable<Course>> GetAllCoursesAsync();
        Task<IEnumerable<CourseHours>> GetCourseHoursByCourseIdAsync(Guid courseId);
        Task<IEnumerable<Course>> GetCourseByParticipantIdAsync(Guid participantId);
    }
}
