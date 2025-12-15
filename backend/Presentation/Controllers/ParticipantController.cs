using Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Application.DTOs.ParticipantDto;

namespace Presentation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ParticipantController : ControllerBase
    {
        private readonly IParticipantService _participantService;

        public ParticipantController(IParticipantService participantService)
        {
            _participantService = participantService;
        }

        [HttpPost]
        [Authorize(Policy = "Kontor")]
        public async Task<IActionResult> CreateParticipant(ParticipantCreateDto participantDto)
        {
            var participant = await _participantService.CreateParticipantAsync(participantDto);
            return Ok(participant);
        }

        [HttpGet("All")]
        [Authorize(Policy = "Kontor")]
        public async Task<IActionResult> GetAllParticipants()
        {
            var participants = await _participantService.GetAllParticipantsAsync();
            return Ok(participants);
        }

        [HttpGet("GetParticipantsByCourseId/{id:guid}")]
        [Authorize]
        public async Task<IActionResult> GetParticipantsByCourseId(Guid id)
        {
            var participants = await _participantService.GetParticipantsByCourseIdAsync(id);
            return Ok(participants);
        }

    }
}
