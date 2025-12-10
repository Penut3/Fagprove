using Application;
//using Application.Interfaces.Services;
using DotNetEnv;
using Infrastructure;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using OpenAI;
using OpenAI.Chat;
using System.ClientModel;

using System;
//using Presentation.Identity;
using System.Security.Claims;


var builder = WebApplication.CreateBuilder(args);

// Load environment variables from .env
Env.Load("C:\\Users\\sande\\Documents\\GitHub\\Fagprøve\\backend\\.env");

// Register infrastructure + application layers
builder.Services.AddHttpClient(); // must be before SupabaseAuthServic
builder.Services.AddHttpContextAccessor();
builder.Services.AddInfrastructure(builder.Configuration);
builder.Services.AddApplication();
//builder.Services.AddScoped<ICurrentUser, CurrentUser>();

// Add authentication & authorization
builder.Services.AddUserValidation();

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("Lærer", policy =>
    {
        policy.RequireAuthenticatedUser();
        policy.RequireRole("78901234-5678-9012-3456-789012345678");
    });

    options.AddPolicy("Kontoransatt", policy =>
    {
        policy.RequireAuthenticatedUser();
        policy.RequireRole("90123456-7890-1234-5678-901234567890");

    });

});

// Add controllers & JSON options
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
    });

builder.Services.AddEndpointsApiExplorer();


// Swagger setup with JWT support
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "Fagprøve API", Version = "v1" });

    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Enter JWT token. Example: `Bearer eyJhb...`",
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
        policy.WithOrigins(
                "http://localhost:3000",
                "http://localhost:5173"
            )
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials()
            // Optional if you need wildcard subdomains:
            // .SetIsOriginAllowed(origin => new Uri(origin).Host.EndsWith(".yourdomain.com"))
    );
});

var app = builder.Build();

// Swagger UI only in Development
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("Frontend");

// Authentication + Authorization
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.Run();