using Application.DTOs.CourseAttendanceDto;
using Application.Interfaces.Services;
using Application.Services;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Presentation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Policy = "Lærer")]
    public class CourseAttendanceController : ControllerBase
    {
        private readonly ICourseAttendanceService _courseAttendanceService;

        public CourseAttendanceController(ICourseAttendanceService courseAttendanceService)
        {
            _courseAttendanceService = courseAttendanceService;
        }

        [HttpPost]
        public async Task<IActionResult> AttendCourse([FromBody] CourseAttendanceCreateDto attendanceDto)
        {
            if (attendanceDto == null) return BadRequest("Invalid request");
            var result = await _courseAttendanceService.CreateCourseAttendanceAsync(attendanceDto);
            if (result == null) return BadRequest("Could not create course");
            return Ok(result);
        }

        [HttpGet("GetAttendancesByCourseHourId/{courseHourId:guid}")]
        public async Task<IActionResult> GetAttendancesByCourseHourId(Guid courseHourId)
        {
            var result = await _courseAttendanceService.GetCourseAttendancesByCourseHoursIdAsync(courseHourId);
            if (result == null) return NotFound("No attendances found");
            return Ok(result);
        }

        [HttpGet("GetLackingAttendancesByCourseHourId/{courseHourId:guid}")]
        public async Task<IActionResult> GetLackingAttendancesByCourseHourId(Guid courseHourId)
        {
            var result = await _courseAttendanceService.GetLackingCourseAttendancesByCourseHoursIdAsync(courseHourId);
            if (result == null) return NotFound("No lacking attendances found");
            return Ok(result);
        }

    }
}