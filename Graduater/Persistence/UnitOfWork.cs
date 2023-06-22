using Core.Contracts;
using Core.Contracts.Repositories;
using Core.Entities.Database;
using Microsoft.EntityFrameworkCore;
using Persistence.Repositories;
using System.Data.Entity;

namespace Persistence
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _context;
        private UserRepository? _userRepository;
        private GroupRepository? _groupRepository;
        private FileRepository? _fileRepository;
        private AssignmentRepository? _assignmentRepository;

        public UnitOfWork()
        {
            _context = new ApplicationDbContext();
        }

        public IUserRepository UserRepository
        {
            get
            {
                _userRepository ??= new UserRepository(_context);
                return _userRepository;
            }
        }

        public IAssignmentRepository AssignmentRepository
        {
            get
            {
                _assignmentRepository ??= new AssignmentRepository(_context);
                return _assignmentRepository;
            }
        }

        public IFileRepository FileRepository
        {
            get
            {
                _fileRepository ??= new FileRepository(_context);
                return _fileRepository;
            }
        }

        public IGroupRepository GroupRepository
        {
            get
            {
                _groupRepository ??= new GroupRepository(_context);
                return _groupRepository;
            }
        }

        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }

        public async Task FillDBAsync()
        {
            await DeleteDatabaseAsync();
            await MigrateDatabaseAsync();



            #region Users
            User user1 = new User
            {
                Id = 1,
                Username = "john_doe",
                FirstName = "John",
                LastName = "Doe",
                Email = "john.doe@example.com",
                PasswordHash = "hashedPassword1",
                RegisteredAt = DateTime.UtcNow,
                IsEmailVerified = true,
                Permissions = UserPermission.Admin,
                PrivacySettings = UserPrivacy.ShowAll,
                // Assignments, Chats, Comments, Groups, Notifications, Polls, Posts, Sessions can be left empty or assigned as needed
            };

            User user2 = new User
            {
                Id = 2,
                Username = "jane_smith",
                FirstName = "Jane",
                LastName = "Smith",
                Email = "jane.smith@example.com",
                PasswordHash = "hashedPassword2",
                RegisteredAt = DateTime.UtcNow,
                IsEmailVerified = true,
                Permissions = UserPermission.Default,
                PrivacySettings = UserPrivacy.ShowFirstName | UserPrivacy.ShowLastName | UserPrivacy.ShowEmail | UserPrivacy.ShowRegisteredAt,
                // Assignments, Chats, Comments, Groups, Notifications, Polls, Posts, Sessions can be left empty or assigned as needed
            };

            User user3 = new User
            {
                Id = 3,
                Username = "alex_johnson",
                FirstName = "Alex",
                LastName = "Johnson",
                Email = "alex.johnson@example.com",
                PasswordHash = "hashedPassword3",
                RegisteredAt = DateTime.UtcNow,
                IsEmailVerified = true,
                Permissions = UserPermission.Moderator,
                PrivacySettings = UserPrivacy.ShowFirstName | UserPrivacy.ShowLastName | UserPrivacy.ShowAssignments | UserPrivacy.ShowGroups | UserPrivacy.ShowPosts,
                // Assignments, Chats, Comments, Groups, Notifications, Polls, Posts, Sessions can be left empty or assigned as needed
            };

            List<User> users = new List<User>() { user1, user2, user3 };
            #endregion

            #region Subjects
            Subject subject1 = new Subject
            {
                Id = 1,
                Name = "Subject 1",
                ShortName = "Sub1"
            };

            Subject subject2 = new Subject
            {
                Id = 2,
                Name = "Subject 2",
                ShortName = "Sub2",
            };

            List<Subject> subjects = new List<Subject> { subject1, subject2 };
            #endregion

            #region Groups
            Group group1 = new Group
            {

                Id = 1,
                Name = "Group 1",
                Description = "Description for Group 1",
                CreatorUserId = 1, // Assuming CreatorUserId is 1 for the corresponding user
            };

            Group group2 = new Group
            {
                Id = 2,
                Name = "Group 2",
                Description = "Description for Group 2",
                CreatorUserId = 2, // Assuming CreatorUserId is 2 for the corresponding user
            };

            List<Group> groups = new List<Group>() { group1, group2 };
            #endregion

            #region Assignments
            Assignment assignment1 = new Assignment
            {
                Id = 1,
                Title = "Assignment 1",
                Description = "Description for Assignment 1",
                Content = "Content for Assignment 1",
                Created = DateTime.UtcNow,
                Modified = DateTime.UtcNow,
                Due = DateTime.UtcNow.AddDays(7),
                GroupId = 1, // Assuming GroupId is 1 for the corresponding group
                SubjectId = 1, // Assuming SubjectId is 1 for the corresponding subject
                UserId = 1 // Assuming UserId is 1 for the corresponding user
            };

            Assignment assignment2 = new Assignment
            {
                Id = 2,
                Title = "Assignment 2",
                Description = "Description for Assignment 2",
                Content = "Content for Assignment 2",
                Created = DateTime.UtcNow,
                Modified = DateTime.UtcNow,
                Due = DateTime.UtcNow.AddDays(14),
                GroupId = 1, // Assuming GroupId is 1 for the corresponding group
                SubjectId = 2, // Assuming SubjectId is 2 for the corresponding subject
                UserId = 2 // Assuming UserId is 2 for the corresponding user
            };

            Assignment assignment3 = new Assignment
            {
                Id = 3,
                Title = "Assignment 3",
                Description = "Description for Assignment 3",
                Content = "Content for Assignment 3",
                Created = DateTime.UtcNow,
                Modified = DateTime.UtcNow,
                Due = DateTime.UtcNow.AddDays(21),
                GroupId = 2, // Assuming GroupId is 2 for the corresponding group
                SubjectId = 1, // Assuming SubjectId is 1 for the corresponding subject
                UserId = 3 // Assuming UserId is 3 for the corresponding user
            };

            List<Assignment> assignments = new List<Assignment>() { assignment1, assignment2, assignment3 };
            #endregion

            _context.Users.AddRange(users);
            _context.Subjects.AddRange(subjects);
            _context.Groups.AddRange(groups);
            _context.Assignments.AddRange(assignments);

            await SaveChangesAsync();
        }


        public async Task DeleteDatabaseAsync() => await _context!.Database.EnsureDeletedAsync();
        public async Task MigrateDatabaseAsync() => await _context!.Database.MigrateAsync();

        public async ValueTask DisposeAsync()
        {
            await DisposeAsync(true);
            GC.SuppressFinalize(this);
        }

        protected virtual async ValueTask DisposeAsync(bool disposing)
        {
            if (disposing)
            {
                await _context.DisposeAsync();
            }
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}