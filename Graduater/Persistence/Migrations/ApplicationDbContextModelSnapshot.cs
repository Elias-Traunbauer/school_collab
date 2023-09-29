﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Persistence;

#nullable disable

namespace Persistence.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("Core.Entities.Database.Assignment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("Created")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("Due")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("GroupId")
                        .HasColumnType("int");

                    b.Property<DateTime>("Modified")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("SubjectId")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<Guid>("Version")
                        .IsConcurrencyToken()
                        .HasColumnType("char(36)");

                    b.HasKey("Id");

                    b.HasIndex("GroupId");

                    b.HasIndex("SubjectId");

                    b.HasIndex("UserId");

                    b.ToTable("Assignments");
                });

            modelBuilder.Entity("Core.Entities.Database.Chat", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("CreatorUserId")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<Guid>("Version")
                        .IsConcurrencyToken()
                        .HasColumnType("char(36)");

                    b.HasKey("Id");

                    b.HasIndex("CreatorUserId");

                    b.ToTable("Chats");
                });

            modelBuilder.Entity("Core.Entities.Database.ChatMember", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("ChatId")
                        .HasColumnType("int");

                    b.Property<DateTime>("Joined")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<Guid>("Version")
                        .IsConcurrencyToken()
                        .HasColumnType("char(36)");

                    b.HasKey("Id");

                    b.HasIndex("ChatId");

                    b.HasIndex("UserId");

                    b.ToTable("ChatMembers");
                });

            modelBuilder.Entity("Core.Entities.Database.ChatMessage", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("ChatId")
                        .HasColumnType("int");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("Created")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<Guid>("Version")
                        .IsConcurrencyToken()
                        .HasColumnType("char(36)");

                    b.HasKey("Id");

                    b.HasIndex("ChatId");

                    b.HasIndex("UserId");

                    b.ToTable("ChatMessages");
                });

            modelBuilder.Entity("Core.Entities.Database.Comment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("DateCreated")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<Guid>("Version")
                        .IsConcurrencyToken()
                        .HasColumnType("char(36)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Comments");
                });

            modelBuilder.Entity("Core.Entities.Database.File", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int?>("AssignmentId")
                        .HasColumnType("int");

                    b.Property<byte[]>("Content")
                        .IsRequired()
                        .HasColumnType("longblob");

                    b.Property<string>("ContentType")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("MIME_Type")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<long>("Size")
                        .HasColumnType("bigint");

                    b.Property<int>("UploadedById")
                        .HasColumnType("int");

                    b.Property<Guid>("Version")
                        .IsConcurrencyToken()
                        .HasColumnType("char(36)");

                    b.HasKey("Id");

                    b.HasIndex("AssignmentId");

                    b.HasIndex("UploadedById");

                    b.ToTable("Files");
                });

            modelBuilder.Entity("Core.Entities.Database.Group", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("CreatorUserId")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<Guid>("Version")
                        .IsConcurrencyToken()
                        .HasColumnType("char(36)");

                    b.HasKey("Id");

                    b.HasIndex("CreatorUserId");

                    b.ToTable("Groups");
                });

            modelBuilder.Entity("Core.Entities.Database.GroupUser", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("GroupId")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<Guid>("Version")
                        .IsConcurrencyToken()
                        .HasColumnType("char(36)");

                    b.HasKey("Id");

                    b.HasIndex("GroupId");

                    b.HasIndex("UserId");

                    b.ToTable("GroupUsers");
                });

            modelBuilder.Entity("Core.Entities.Database.Notification", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("Created")
                        .HasColumnType("datetime(6)");

                    b.Property<bool>("IsRead")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Link")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<Guid>("Version")
                        .IsConcurrencyToken()
                        .HasColumnType("char(36)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Notifications");
                });

            modelBuilder.Entity("Core.Entities.Database.Poll", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("CreatorUserId")
                        .HasColumnType("int");

                    b.Property<DateTime>("DateCreated")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("Due")
                        .HasColumnType("datetime(6)");

                    b.Property<bool>("IsAnonymous")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<Guid>("Version")
                        .IsConcurrencyToken()
                        .HasColumnType("char(36)");

                    b.HasKey("Id");

                    b.HasIndex("CreatorUserId");

                    b.ToTable("Polls");
                });

            modelBuilder.Entity("Core.Entities.Database.PollOption", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("PollId")
                        .HasColumnType("int");

                    b.Property<Guid>("Version")
                        .IsConcurrencyToken()
                        .HasColumnType("char(36)");

                    b.Property<int>("Votes")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("PollId");

                    b.ToTable("PollOptions");
                });

            modelBuilder.Entity("Core.Entities.Database.Post", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("DateCreated")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<Guid>("Version")
                        .IsConcurrencyToken()
                        .HasColumnType("char(36)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Posts");
                });

            modelBuilder.Entity("Core.Entities.Database.PostComment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("CommentId")
                        .HasColumnType("int");

                    b.Property<int>("PostId")
                        .HasColumnType("int");

                    b.Property<Guid>("Version")
                        .IsConcurrencyToken()
                        .HasColumnType("char(36)");

                    b.HasKey("Id");

                    b.HasIndex("CommentId");

                    b.HasIndex("PostId");

                    b.ToTable("PostComments");
                });

            modelBuilder.Entity("Core.Entities.Database.Report", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int?>("AssignmentId")
                        .HasColumnType("int");

                    b.Property<int?>("ChatId")
                        .HasColumnType("int");

                    b.Property<int?>("ChatMemberId")
                        .HasColumnType("int");

                    b.Property<int?>("ChatMessageId")
                        .HasColumnType("int");

                    b.Property<int?>("CommentId")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("CreatedById")
                        .HasColumnType("int");

                    b.Property<int?>("FileId")
                        .HasColumnType("int");

                    b.Property<int?>("GroupId")
                        .HasColumnType("int");

                    b.Property<int?>("GroupUserId")
                        .HasColumnType("int");

                    b.Property<int?>("NotificationId")
                        .HasColumnType("int");

                    b.Property<int?>("PollId")
                        .HasColumnType("int");

                    b.Property<int?>("PollOptionId")
                        .HasColumnType("int");

                    b.Property<int?>("PostCommentId")
                        .HasColumnType("int");

                    b.Property<int?>("PostId")
                        .HasColumnType("int");

                    b.Property<string>("Reason")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<byte[]>("RowVersion")
                        .IsRequired()
                        .HasColumnType("longblob");

                    b.Property<int?>("SubjectId")
                        .HasColumnType("int");

                    b.Property<int>("Type")
                        .HasColumnType("int");

                    b.Property<int?>("UserSessionId")
                        .HasColumnType("int");

                    b.Property<bool>("WasChecked")
                        .HasColumnType("tinyint(1)");

                    b.HasKey("Id");

                    b.HasIndex("AssignmentId");

                    b.HasIndex("ChatId");

                    b.HasIndex("ChatMemberId");

                    b.HasIndex("ChatMessageId");

                    b.HasIndex("CommentId");

                    b.HasIndex("CreatedById");

                    b.HasIndex("FileId");

                    b.HasIndex("GroupId");

                    b.HasIndex("GroupUserId");

                    b.HasIndex("NotificationId");

                    b.HasIndex("PollId");

                    b.HasIndex("PollOptionId");

                    b.HasIndex("PostCommentId");

                    b.HasIndex("PostId");

                    b.HasIndex("SubjectId");

                    b.HasIndex("UserSessionId");

                    b.ToTable("Reports");
                });

            modelBuilder.Entity("Core.Entities.Database.Subject", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("ShortName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<Guid>("Version")
                        .IsConcurrencyToken()
                        .HasColumnType("char(36)");

                    b.HasKey("Id");

                    b.ToTable("Subjects");
                });

            modelBuilder.Entity("Core.Entities.Database.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.Property<string>("EmailVerificationToken")
                        .HasColumnType("longtext");

                    b.Property<DateTime?>("EmailVerificationTokenExpiration")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<bool>("IsEmailVerified")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("PasswordResetToken")
                        .HasColumnType("longtext");

                    b.Property<DateTime?>("PasswordResetTokenExpiration")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("PasswordSalt")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("Permissions")
                        .HasColumnType("int");

                    b.Property<int>("PrivacySettings")
                        .HasColumnType("int");

                    b.Property<int?>("ProfilePictureId")
                        .HasColumnType("int");

                    b.Property<DateTime>("RegisteredAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.Property<Guid>("Version")
                        .IsConcurrencyToken()
                        .HasColumnType("char(36)");

                    b.HasKey("Id");

                    b.HasIndex("Email")
                        .IsUnique();

                    b.HasIndex("ProfilePictureId");

                    b.HasIndex("Username")
                        .IsUnique();

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Core.Entities.Database.UserSession", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("Expires")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Ip")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("IssuedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime>("LastAction")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("SessionKey")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<Guid>("Version")
                        .IsConcurrencyToken()
                        .HasColumnType("char(36)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("UserSession");
                });

            modelBuilder.Entity("Core.Entities.Database.Assignment", b =>
                {
                    b.HasOne("Core.Entities.Database.Group", "Group")
                        .WithMany("Assignments")
                        .HasForeignKey("GroupId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Core.Entities.Database.Subject", "Subject")
                        .WithMany("Assignments")
                        .HasForeignKey("SubjectId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Core.Entities.Database.User", "User")
                        .WithMany("Assignments")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Group");

                    b.Navigation("Subject");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Core.Entities.Database.Chat", b =>
                {
                    b.HasOne("Core.Entities.Database.User", "CreatorUser")
                        .WithMany("Chats")
                        .HasForeignKey("CreatorUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("CreatorUser");
                });

            modelBuilder.Entity("Core.Entities.Database.ChatMember", b =>
                {
                    b.HasOne("Core.Entities.Database.Chat", "Chat")
                        .WithMany("ChatMembers")
                        .HasForeignKey("ChatId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Core.Entities.Database.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Chat");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Core.Entities.Database.ChatMessage", b =>
                {
                    b.HasOne("Core.Entities.Database.Chat", "Chat")
                        .WithMany("ChatMessages")
                        .HasForeignKey("ChatId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Core.Entities.Database.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Chat");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Core.Entities.Database.Comment", b =>
                {
                    b.HasOne("Core.Entities.Database.User", "User")
                        .WithMany("Comments")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("Core.Entities.Database.File", b =>
                {
                    b.HasOne("Core.Entities.Database.Assignment", null)
                        .WithMany("Files")
                        .HasForeignKey("AssignmentId");

                    b.HasOne("Core.Entities.Database.User", "UploadedBy")
                        .WithMany()
                        .HasForeignKey("UploadedById")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("UploadedBy");
                });

            modelBuilder.Entity("Core.Entities.Database.Group", b =>
                {
                    b.HasOne("Core.Entities.Database.User", "CreatorUser")
                        .WithMany("Groups")
                        .HasForeignKey("CreatorUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("CreatorUser");
                });

            modelBuilder.Entity("Core.Entities.Database.GroupUser", b =>
                {
                    b.HasOne("Core.Entities.Database.Group", "Group")
                        .WithMany("GroupUsers")
                        .HasForeignKey("GroupId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Core.Entities.Database.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Group");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Core.Entities.Database.Notification", b =>
                {
                    b.HasOne("Core.Entities.Database.User", "User")
                        .WithMany("Notifications")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("Core.Entities.Database.Poll", b =>
                {
                    b.HasOne("Core.Entities.Database.User", "CreatorUser")
                        .WithMany("Polls")
                        .HasForeignKey("CreatorUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("CreatorUser");
                });

            modelBuilder.Entity("Core.Entities.Database.PollOption", b =>
                {
                    b.HasOne("Core.Entities.Database.Poll", "Poll")
                        .WithMany("PollOptions")
                        .HasForeignKey("PollId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Poll");
                });

            modelBuilder.Entity("Core.Entities.Database.Post", b =>
                {
                    b.HasOne("Core.Entities.Database.User", "User")
                        .WithMany("Posts")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("Core.Entities.Database.PostComment", b =>
                {
                    b.HasOne("Core.Entities.Database.Comment", "Comment")
                        .WithMany()
                        .HasForeignKey("CommentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Core.Entities.Database.Post", "Post")
                        .WithMany("PostComments")
                        .HasForeignKey("PostId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Comment");

                    b.Navigation("Post");
                });

            modelBuilder.Entity("Core.Entities.Database.Report", b =>
                {
                    b.HasOne("Core.Entities.Database.Assignment", null)
                        .WithMany("Reports")
                        .HasForeignKey("AssignmentId");

                    b.HasOne("Core.Entities.Database.Chat", null)
                        .WithMany("Reports")
                        .HasForeignKey("ChatId");

                    b.HasOne("Core.Entities.Database.ChatMember", null)
                        .WithMany("Reports")
                        .HasForeignKey("ChatMemberId");

                    b.HasOne("Core.Entities.Database.ChatMessage", null)
                        .WithMany("Reports")
                        .HasForeignKey("ChatMessageId");

                    b.HasOne("Core.Entities.Database.Comment", null)
                        .WithMany("Reports")
                        .HasForeignKey("CommentId");

                    b.HasOne("Core.Entities.Database.User", "CreatedBy")
                        .WithMany("Reports")
                        .HasForeignKey("CreatedById")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Core.Entities.Database.File", null)
                        .WithMany("Reports")
                        .HasForeignKey("FileId");

                    b.HasOne("Core.Entities.Database.Group", null)
                        .WithMany("Reports")
                        .HasForeignKey("GroupId");

                    b.HasOne("Core.Entities.Database.GroupUser", null)
                        .WithMany("Reports")
                        .HasForeignKey("GroupUserId");

                    b.HasOne("Core.Entities.Database.Notification", null)
                        .WithMany("Reports")
                        .HasForeignKey("NotificationId");

                    b.HasOne("Core.Entities.Database.Poll", null)
                        .WithMany("Reports")
                        .HasForeignKey("PollId");

                    b.HasOne("Core.Entities.Database.PollOption", null)
                        .WithMany("Reports")
                        .HasForeignKey("PollOptionId");

                    b.HasOne("Core.Entities.Database.PostComment", null)
                        .WithMany("Reports")
                        .HasForeignKey("PostCommentId");

                    b.HasOne("Core.Entities.Database.Post", null)
                        .WithMany("Reports")
                        .HasForeignKey("PostId");

                    b.HasOne("Core.Entities.Database.Subject", null)
                        .WithMany("Reports")
                        .HasForeignKey("SubjectId");

                    b.HasOne("Core.Entities.Database.UserSession", null)
                        .WithMany("Reports")
                        .HasForeignKey("UserSessionId");

                    b.Navigation("CreatedBy");
                });

            modelBuilder.Entity("Core.Entities.Database.User", b =>
                {
                    b.HasOne("Core.Entities.Database.File", "ProfilePicture")
                        .WithMany()
                        .HasForeignKey("ProfilePictureId");

                    b.Navigation("ProfilePicture");
                });

            modelBuilder.Entity("Core.Entities.Database.UserSession", b =>
                {
                    b.HasOne("Core.Entities.Database.User", "User")
                        .WithMany("Sessions")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("Core.Entities.Database.Assignment", b =>
                {
                    b.Navigation("Files");

                    b.Navigation("Reports");
                });

            modelBuilder.Entity("Core.Entities.Database.Chat", b =>
                {
                    b.Navigation("ChatMembers");

                    b.Navigation("ChatMessages");

                    b.Navigation("Reports");
                });

            modelBuilder.Entity("Core.Entities.Database.ChatMember", b =>
                {
                    b.Navigation("Reports");
                });

            modelBuilder.Entity("Core.Entities.Database.ChatMessage", b =>
                {
                    b.Navigation("Reports");
                });

            modelBuilder.Entity("Core.Entities.Database.Comment", b =>
                {
                    b.Navigation("Reports");
                });

            modelBuilder.Entity("Core.Entities.Database.File", b =>
                {
                    b.Navigation("Reports");
                });

            modelBuilder.Entity("Core.Entities.Database.Group", b =>
                {
                    b.Navigation("Assignments");

                    b.Navigation("GroupUsers");

                    b.Navigation("Reports");
                });

            modelBuilder.Entity("Core.Entities.Database.GroupUser", b =>
                {
                    b.Navigation("Reports");
                });

            modelBuilder.Entity("Core.Entities.Database.Notification", b =>
                {
                    b.Navigation("Reports");
                });

            modelBuilder.Entity("Core.Entities.Database.Poll", b =>
                {
                    b.Navigation("PollOptions");

                    b.Navigation("Reports");
                });

            modelBuilder.Entity("Core.Entities.Database.PollOption", b =>
                {
                    b.Navigation("Reports");
                });

            modelBuilder.Entity("Core.Entities.Database.Post", b =>
                {
                    b.Navigation("PostComments");

                    b.Navigation("Reports");
                });

            modelBuilder.Entity("Core.Entities.Database.PostComment", b =>
                {
                    b.Navigation("Reports");
                });

            modelBuilder.Entity("Core.Entities.Database.Subject", b =>
                {
                    b.Navigation("Assignments");

                    b.Navigation("Reports");
                });

            modelBuilder.Entity("Core.Entities.Database.User", b =>
                {
                    b.Navigation("Assignments");

                    b.Navigation("Chats");

                    b.Navigation("Comments");

                    b.Navigation("Groups");

                    b.Navigation("Notifications");

                    b.Navigation("Polls");

                    b.Navigation("Posts");

                    b.Navigation("Reports");

                    b.Navigation("Sessions");
                });

            modelBuilder.Entity("Core.Entities.Database.UserSession", b =>
                {
                    b.Navigation("Reports");
                });
#pragma warning restore 612, 618
        }
    }
}
