using Api.Middlewares;
using Core.Contracts;
using Core.Contracts.Services;
using Microsoft.AspNetCore.Http.Json;
using Persistence;
using Ribbon.API.Middlewares;
using Service.Services;
using System.Text.Json;
using System.Text.Json.Serialization;

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
                builder
                .AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod();
            }));

            builder.Services.AddSingleton<IJsonWebTokenService, JsonWebTokenService>();
            builder.Services.AddSingleton<IRandomKeyService, RandomKeyService>();
            builder.Services.AddSingleton<IPasswordService, PasswordService>();
            builder.Services.AddSingleton<ICaptchaRegistryService, CaptchaRegistryService>();
            builder.Services.AddSingleton<IRealTimeChatMessageService, RealTimeChatMessageService>();

            builder.Services.AddScoped<IFileService, FileService>();
            builder.Services.AddScoped<IAssignmentService, AssignmentService>();
            builder.Services.AddScoped<IGroupService, GroupService>();
            builder.Services.AddScoped<ISubjectService, SubjectService>();
            builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
            builder.Services.AddScoped<IUserService, UserService>();
            builder.Services.AddScoped<IChatService, ChatService>();
            builder.Services.AddScoped<ISummaryService, SummaryService>();

            builder.Services.AddControllers().AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
            });
            builder.Services.AddSwaggerGen();

            builder.Services.AddEndpointsApiExplorer();

            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                //app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHsts();
            //app.UseHttpsRedirection();

            app.UseCustomExceptionHandling();

            app.UseUserAuthentication();
            app.UseUserAuthorization();

            app.UseRateLimiting();

            app.MapControllers();

            app.Run();
        }
    }
}