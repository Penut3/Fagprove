using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using Domain.Entities;
using Microsoft.Extensions.Logging.Console;
using Application.DTOs.CourseDto;
using Microsoft.EntityFrameworkCore;

namespace Application.Services
{
    public class CourseService : ICourseService
    {
        private readonly IBaseRepository<Course> _courseRepo;
        private readonly IBaseRepository<CourseHours> _courseHoursRepo;
        private readonly IBaseRepository<ParticipantCourse> _participantCourseRepo;

        public CourseService(IBaseRepository<Course> courseRepo, IBaseRepository<CourseHours> courseHoursRepo, IBaseRepository<ParticipantCourse> participantCourseRepo)
        {
            _courseRepo = courseRepo;
            _courseHoursRepo = courseHoursRepo;
            _participantCourseRepo = participantCourseRepo;
        }

        public async Task<Course> CreateCourseAsync(CourseCreateDto courseDto, Guid userId)
        {
            var course = new Course
            {
                Id = Guid.NewGuid(),
                Name = courseDto.Name,
                UserId = userId,
            };

            await _courseRepo.Add(course);
            await _courseRepo.SaveChanges();

            foreach (var date in courseDto.CourseHourDates)
            {
                var courseHour = new CourseHours
                {
                    Id = Guid.NewGuid(),
                    CourseId = course.Id,
                    StartTime = date,
                    DurationInMinutes = 180, // Assuming each course hour is 3 hours long
                };
                await _courseHoursRepo.Add(courseHour);
            }

            return course;
        }

        public async Task<IEnumerable<Course>>  GetAllCoursesAsync()
        {
            return await _courseRepo.GetAll();
        }

        //get my courses
        public async Task<IEnumerable<Course>> GetCoursesByUserIdAsync(Guid userId)
        {
            var courses = await _courseRepo
                .GetQueryable()
                .Where(c => c.UserId == userId)
                .ToListAsync();
            return courses;
        }


        public async Task<IEnumerable<CourseHours>> GetCourseHoursByCourseIdAsync(Guid courseId)
        {
            var courseHours = await _courseHoursRepo
                .GetQueryable()
                .Where(ch => ch.CourseId == courseId)
                .ToListAsync();
            return courseHours;
        }

        public async Task<IEnumerable<Course>> GetCourseByParticipantIdAsync(Guid participantId)
        {
            var participantCourses = await _participantCourseRepo
                .GetQueryable()
                .Where(pc => pc.ParticipantId == participantId)
                .ToListAsync();

            var courses = await _courseRepo
                .GetQueryable()
                .Where(c => participantCourses.Select(pc => pc.CourseId).Contains(c.Id))
                .ToListAsync();

            return courses;
        }
    }
}
