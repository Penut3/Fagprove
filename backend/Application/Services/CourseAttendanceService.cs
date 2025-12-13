using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using Domain.Entities;
using Microsoft.Extensions.Logging.Console;
using Application.DTOs.CourseAttendanceDto;
using Microsoft.EntityFrameworkCore;
namespace Application.Services
{
    public class CourseAttendanceService : ICourseAttendanceService
    {
        private readonly IBaseRepository<CourseAttendance> _courseAttendanceRepo;
        private readonly IBaseRepository<Participant> _participantRepo;
        private readonly IBaseRepository<CourseHours> _courseHoursRepo;
        private readonly IParticipantService _participantService;

        public CourseAttendanceService(
            IBaseRepository<CourseAttendance> courseAttendanceRepo, 
            IBaseRepository<Participant> participantRepo, 
            IBaseRepository<CourseHours> courseHoursRepo, 
            IParticipantService participantService)
        {
            _courseAttendanceRepo = courseAttendanceRepo;
            _participantRepo = participantRepo;
            _participantService = participantService;
            _courseHoursRepo = courseHoursRepo;
        }

        public async Task<CourseAttendance> CreateCourseAttendanceAsync(CourseAttendanceCreateDto courseDto)
        {
            var courseAttendance = new CourseAttendance
            {
                Id = Guid.NewGuid(),
                WasPresent = courseDto.WasPresent,
                CourseHoursId = courseDto.CourseHoursId,
                ParticipantId = courseDto.ParticipantId
            };

            await _courseAttendanceRepo.Add(courseAttendance);
            await _courseAttendanceRepo.SaveChanges();

            return courseAttendance;
        }

        public async Task<IEnumerable<CourseAttendanceGetDto>> GetCourseAttendancesByCourseHoursIdAsync(Guid courseHoursId)
        {
            return await _courseAttendanceRepo
                .GetQueryable()
                .Where(ca => ca.CourseHoursId == courseHoursId)
                .Select(ca => new CourseAttendanceGetDto
                {
                    ParticipantId = ca.ParticipantId,
                    ParticipantName = ca.Participant.Name,
                    WasPresent = ca.WasPresent,
                    CreatedAt = ca.CreatedAt,
                    CourseHoursId = ca.CourseHoursId,
                    Id = ca.Id,
                    IsDeleted = ca.IsDeleted
                })
                .ToListAsync();
        }



        public async Task<IEnumerable<Participant>> GetLackingCourseAttendancesByCourseHoursIdAsync(Guid courseHoursId)
        {
            // Get course Id
            var courseHour = await _courseHoursRepo.GetById(courseHoursId);

            if(courseHour == null)
            {
                throw new Exception("Course hour not found");
            }

            //Get all participants in a course
            var participantsInCourse = await _participantService.GetParticipantsByCourseIdAsync(courseHour.CourseId);


            //Get all course attendances for the specified course hours
            var courseAttendances = await _courseAttendanceRepo
                .GetQueryable()
                .Where(ca => ca.CourseHoursId == courseHoursId)
                .ToListAsync();

            // Find participants who do not have an attendance record for the specified course hours
            var lackingParticipants = new List<Participant>();

            foreach (var participant in participantsInCourse)
            {
                if(!courseAttendances.Any(ca => ca.ParticipantId == participant.Id))
                {
                    // Participant is lacking attendance record for this course hour
                    
                    lackingParticipants.Add(participant);
                }
            }

            return lackingParticipants;
        }
    }
}

