using Core.Entities.Database;
using Trauni.EntityFramework.LargeBlobs;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Persistence;

public partial class ApplicationDbContext : EFLargeBlobApplicationDbContext
{
    private readonly ApiConfig? _config;

    public ApiConfig? Configuration
    { get { return _config; } }

    public ApplicationDbContext(bool dummy = false) : base()
    {
        if (dummy)
        {
            return;
        }
        Console.WriteLine("Using default configuration");
        // display path
        Console.WriteLine(Environment.CurrentDirectory);
        var builder = new ConfigurationBuilder()
                        .SetBasePath(Environment.CurrentDirectory).AddJsonFile
                        ("appsettings.json", optional: false, reloadOnChange: false);
        System.Console.WriteLine("building config");
        try {
        var cfg = builder.Build();
        System.Console.WriteLine(cfg.GetDebugView());
        ApiConfig config = new();
        cfg.Bind("ApiConfig", config);
        Console.WriteLine($"Database Connection String: {config.DatabaseConnectionString}");
        _config = config;

        }
        catch (Exception ex) {
            Console.WriteLine(ex.Message);
            Console.WriteLine(ex.StackTrace);
            throw;
        }

    }

    public ApplicationDbContext(ApiConfig config) : base()
    {
        _config = config;
    }

    public virtual DbSet<Assignment> Assignments { get; set; }

    public virtual DbSet<Chat> Chats { get; set; }

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

    public virtual DbSet<AssignmentFile> AssignmentFiles { get; set; }

    public virtual DbSet<Summary> Summaries { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (_config?.DatabaseConnectionString == null)
        {
            throw new Exception("Database connection string is null");
        }
        optionsBuilder
            .UseMySQL(_config.DatabaseConnectionString);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Assignment>()
            .HasMany(e => e.Files);
        modelBuilder.Entity<Assignment>()
            .HasMany(e => e.Instructions);
        base.OnModelCreating(modelBuilder);
    }
}