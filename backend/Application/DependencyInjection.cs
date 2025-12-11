
using Application.Interfaces.Services;
using Application.Services;
using Domain.Entities;
using Microsoft.Extensions.DependencyInjection;


namespace Application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            AddServices(services);
            //services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<IRoleService, RoleService>();
            services.AddTransient<ICourseAttendanceService, CourseAttendanceService>();
            services.AddTransient<ICourseService, CourseService>();
            services.AddTransient<IParticipantService, ParticipantService>();
            return services;
        }

        private static IServiceCollection AddServices(IServiceCollection services)
        {
          

            return services;
        }
    }
}