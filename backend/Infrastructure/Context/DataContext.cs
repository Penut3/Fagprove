using Domain.Entities;
using Microsoft.EntityFrameworkCore;

public class DataContext : DbContext
{
  
    public DbSet<User> Users { get; set; }
    public DbSet<Role> Roles { get; set; }
    public DbSet<Course> Courses { get; set; }
    public DbSet<Participant> Participants { get; set; }
    public DbSet<ParticipantCourse> ParticipantCourses { get; set; }
    public DbSet<CourseHours> CourseHours { get; set; }
    public DbSet<CourseAttendance> CourseAttendances { get; set; }


    public DataContext(DbContextOptions<DataContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

    }
}
