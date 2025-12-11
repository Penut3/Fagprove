using Application.DTOs.ParticipantDto;
using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging.Console;

namespace Application.Services
{
    public class ParticipantService : IParticipantService
    {
        private readonly IBaseRepository<Participant> _participantRepo;
        private readonly IBaseRepository<ParticipantCourse> _participantCourseRepo;


        public ParticipantService(IBaseRepository<Participant> participantRepo, IBaseRepository<ParticipantCourse> participantCourseRepo)
        {
            _participantRepo = participantRepo;
            _participantCourseRepo = participantCourseRepo;
        }

        public async Task<Participant> CreateParticipantAsync(ParticipantCreateDto participantDto)
        {


            var participant = new Participant
            {
                Id = Guid.NewGuid(),
                Name = participantDto.Name,
                PhoneNumber = participantDto.PhoneNumber,
                CreatedAt = DateTime.UtcNow,
            };
            await _participantRepo.Add(participant);

            foreach (var courseId in participantDto.CourseIds)
            {
                var participantCourse = new ParticipantCourse
                {
                    Id = Guid.NewGuid(),
                    ParticipantId = participant.Id,
                    CourseId = courseId,
                    CreatedAt = DateTime.UtcNow,
                };
                await _participantCourseRepo.Add(participantCourse);
            }

            return participant;
        }

        public async Task<IEnumerable<Participant>> GetParticipantsByCourseIdAsync(Guid courseId)
        {
            var participantCourses = await _participantCourseRepo
                .GetQueryable()
                .Where(pc => pc.CourseId == courseId)
                .ToListAsync();

            var participants = await _participantRepo
                .GetQueryable()
                .Where(p => participantCourses.Select(pc => pc.ParticipantId).Contains(p.Id))
                .ToListAsync();

            return participants;
        }
    }
}
