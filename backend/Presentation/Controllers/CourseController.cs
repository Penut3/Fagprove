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
        public async Task<IActionResult> CreateCourse([FromBody] CourseCreateDto courseDto)
        {
            if (courseDto == null) return BadRequest("Invalid request");
            var course = await _courseService.CreateCourseAsync(courseDto);
            if (course == null) return BadRequest("Could not create course");
            return CreatedAtAction(nameof(CreateCourse), new { id = course.Id }, course);
        }

        [HttpGet("GetMyCourses")]
        [Authorize]
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

    }
}   