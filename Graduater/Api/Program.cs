using Api.Middlewares;
using Core.Contracts;
using Core.Contracts.Services;
using Persistence;
using Ribbon.API.Middlewares;
using Service.Services;

namespace Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            ApiConfig apiConfig = new();
            builder.Configuration.Bind("ApiConfig", apiConfig);
            builder.Services.AddSingleton(apiConfig);
            var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

            builder.Services.AddCors(o => o.AddPolicy(MyAllowSpecificOrigins, builder =>
            {
                builder.AllowAnyOrigin()
                       .AllowAnyMethod()
                       .AllowAnyHeader();
            }));

            builder.Services.AddSingleton<IJsonWebTokenService, JsonWebTokenService>();
            builder.Services.AddSingleton<IRandomKeyService, RandomKeyService>();
            builder.Services.AddSingleton<IPasswordService, PasswordService>();
            builder.Services.AddSingleton<ICaptchaRegistryService, CaptchaRegistryService>();

            builder.Services.AddScoped<IFileService, FileService>();
            builder.Services.AddScoped<IUserService, UserService>();
            builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
            builder.Services.AddScoped<IAssignmentService, AssignmentService>();

            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();


            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.UseCors(builder =>
                {
                    builder
                    .AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader();
                });
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHsts();
            app.UseHttpsRedirection();

            app.UseUserAuthentication();
            app.UseUserAuthorization();

            app.UseRateLimiting();

            app.MapControllers();

            app.Run();
        }
    }
}