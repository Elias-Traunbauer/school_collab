using Core.Entities.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Persistence;

public partial class ApplicationDbContext : DbContext
{
    readonly ApiConfig? _config;

    public ApiConfig? Configuration { get { return _config; } }


    public ApplicationDbContext(bool dummy = false) : base()
    {
        if (dummy)
        {
            return;
        }
        var builder = new ConfigurationBuilder()
                        .SetBasePath(Environment.CurrentDirectory).AddJsonFile
                        ("appsettings.json", optional: false, reloadOnChange: false);
        var cfg = builder.Build();
        ApiConfig config = new();
        cfg.Bind("ApiConfig", config);
        _config = config;
    }

    public ApplicationDbContext(ApiConfig config) : base()
    {
        _config = config;
    }

    public virtual DbSet<Assignment> Assignments { get; set; }

    public virtual DbSet<Chat> Chats {get; set; }

    public virtual DbSet<ChatMember> ChatMembers { get; set; }

    public virtual DbSet<ChatMessage> ChatMessages { get; set; }

    public virtual DbSet<Comment> Comments { get; set; }

    public virtual DbSet<Core.Entities.Database.File> Files { get; set; }

    public virtual DbSet<Group> Groups { get; set; }

    public virtual DbSet<GroupUser> GroupUsers { get; set; }

    public virtual DbSet<Notification> Notifications { get; set; }

    public virtual DbSet<Poll> Polls { get; set; }

    public virtual DbSet<PollOption> PollOptions { get; set; }

    public virtual DbSet<Post> Posts { get; set; }

    public virtual DbSet<PostComment> PostComments { get; set; }

    public virtual DbSet<Report> Reports { get; set; }

    public virtual DbSet<Subject> Subjects { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<UserSession> UserSession { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (_config?.DatabaseConnectionString == null)
        {
            throw new Exception("Database connection string is null");
        }
        optionsBuilder.UseMySQL(_config.DatabaseConnectionString);
    }
}
