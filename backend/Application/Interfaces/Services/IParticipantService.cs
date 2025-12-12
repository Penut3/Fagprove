using Application.DTOs.ParticipantDto;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces.Services
{
    public interface IParticipantService
    {
        Task<Participant> CreateParticipantAsync(ParticipantCreateDto participantDto);
        Task<IEnumerable<Participant>> GetParticipantsByCourseIdAsync(Guid courseId);
        Task<IEnumerable<Participant>> GetAllParticipantsAsync();
    }
}
