using Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Application.DTOs.CourseDto;

namespace Presentation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CourseController : ControllerBase
    {
        private readonly ICourseService _courseService;

        public CourseController(ICourseService courseService)
        {
            _courseService = courseService;
        }

        [HttpPost("CreateCourse")]
        [Authorize(Policy = "Lærer")]
        public async Task<IActionResult> CreateCourse([FromBody] CourseCreateDto courseDto)
        {
            if (courseDto == null)
                return BadRequest("Invalid request");

            var userIdClaim = User.FindFirst("dbUserId")?.Value;
            if (string.IsNullOrWhiteSpace(userIdClaim))
                return Unauthorized("UserId claim missing");

            if (!Guid.TryParse(userIdClaim, out var userId))
                return Unauthorized("Invalid UserId claim");

            var course = await _courseService.CreateCourseAsync(courseDto, userId);

            if (course == null)
                return BadRequest("Could not create course");

            return CreatedAtAction(nameof(CreateCourse), new { id = course.Id }, course);
        }

        [HttpGet("GetAllCourses")]
        [Authorize(Policy = "Kontor")]
        public async Task<IActionResult> GetAllCourses()
        {
            var courses = await _courseService.GetAllCoursesAsync();
            return Ok(courses);
        }

        [HttpGet("GetMyCourses")]
        [Authorize(Policy ="Lærer")]
        public async Task<IActionResult> GetMyCourses()
        {
            // Try to get the dbUserId claim directly
            var dbUserIdString = User.FindFirst("dbUserId")?.Value;

            if (string.IsNullOrWhiteSpace(dbUserIdString))
                return Unauthorized("dbUserId claim is missing in the token.");

            if (!Guid.TryParse(dbUserIdString, out var dbUserId))
                return Unauthorized("dbUserId claim is not a valid GUID.");

            var courses = await _courseService.GetCoursesByUserIdAsync(dbUserId);

            if (courses == null || !courses.Any())
                return NotFound("No courses found");

            return Ok(courses);
        }

        [HttpGet("GetCourseHours/{courseId:guid}")]
        [Authorize(Policy = "Lærer")]
        public async Task<IActionResult> GetCourseHours(Guid courseId)
        {
            var courseHours = await _courseService.GetCourseHoursByCourseIdAsync(courseId);
            if (courseHours == null || !courseHours.Any())
                return NotFound("No course hours found");
            return Ok(courseHours);
        }

        [HttpGet("GetCoursesByParticipantId/{participantId:guid}")]
        [Authorize(Policy = "Kontor")]
        public async Task<IActionResult> GetCourseByParticipantId(Guid participantId)
        {
            var courses = await _courseService.GetCourseByParticipantIdAsync(participantId);
            if (courses == null || !courses.Any())
                return NotFound("No courses found for the participant");
            return Ok(courses);
        }
    }
}   