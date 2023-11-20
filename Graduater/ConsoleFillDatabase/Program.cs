using Core.Contracts;
using Core.Contracts.Models;
using Core.Contracts.Services;
using Core.Entities.Database;
using Persistence;
using Service.Services;

namespace ConsoleFillDatabase
{
    internal class Program
    {
        static async Task Main(string[] args)
        {
            using (UnitOfWorkFillDB uow = new UnitOfWorkFillDB())
            {
                Console.WriteLine("Daten werden importiert....");
                await uow.Init();


                ApiConfig config = new ApiConfig();
                JsonWebTokenService jsonWebTokenService = new JsonWebTokenService(config);
                PasswordService passwordService = new PasswordService();
                RandomKeyService randomKeyService = new RandomKeyService();
                UserService userService = new UserService(uow, jsonWebTokenService, passwordService, randomKeyService);
                GroupService groupService = new GroupService(uow, config);
                AssignmentService assignmentService = new AssignmentService(uow);

                InitSubjects(uow);
                await uow.SaveChangesAsync();
                await InitUsers(uow, userService);
                await InitGroups(groupService);
                await InitAssignments(assignmentService);



                await uow.SaveChangesAsync();

                Console.WriteLine("Done!");
            }
            Console.WriteLine("<Taste drücken>");
            Console.ReadKey();
        }

        private static async Task InitAssignments(AssignmentService assignmentService)
        {
            var assignments = new List<AssignmentPostPayload>
            {
                new AssignmentPostPayload
                {
                    Title = "Assignment 1",
                    Description = "This is the first assignment",
                    Content = "Assignment content goes here",
                    Due = DateTime.Now.AddDays(7),
                    GroupId = 1,
                    SubjectId = 1
                },
                new AssignmentPostPayload
                {
                    Title = "Assignment 2",
                    Description = "This is the second assignment",
                    Content = "Assignment content goes here",
                    Due = DateTime.Now.AddDays(14),
                    GroupId = 2,
                    SubjectId = 1
                },
                new AssignmentPostPayload
                {
                    Title = "Assignment 3",
                    Description = "This is the third assignment",
                    Content = "Assignment content goes here",
                    Due = DateTime.Now.AddDays(10),
                    GroupId = 1,
                    SubjectId = 2
                },
                new AssignmentPostPayload
                {
                    Title = "Assignment 4",
                    Description = "This is the fourth assignment",
                    Content = "Assignment content goes here",
                    Due = DateTime.Now.AddDays(5),
                    GroupId = 2,
                    SubjectId = 2
                },
                new AssignmentPostPayload
                {
                    Title = "Assignment 5",
                    Description = "This is the fifth assignment",
                    Content = "Assignment content goes here",
                    Due = DateTime.Now.AddDays(3),
                    GroupId = 1,
                    SubjectId = 1
                }
            };


            foreach (var assignment in assignments)
            {
                await assignmentService.CreateAssignmentAsync(assignment, 1);
            }
        }

        private static async Task InitGroups(GroupService groupService)
        {
            var groups = new List<Group>
            {
                new Group
                {
                    Name = "Group 1",
                    Description = "This is the first group",
                    CreatorUserId = 1,
                    CreatorUser = null, // Set the creator user as needed
                    GroupUsers = null // Set the group users as needed
                },
                new Group
                {
                    Name = "Group 2",
                    Description = "This is the second group",
                    CreatorUserId = 2,
                    CreatorUser = null, // Set the creator user as needed
                    GroupUsers = null // Set the group users as needed
                },
                new Group
                {
                    Name = "Group 3",
                    Description = "This is the third group",
                    CreatorUserId = 3,
                    CreatorUser = null, // Set the creator user as needed
                    GroupUsers = null // Set the group users as needed
                }
            };

            foreach (var group in groups) { 
                await groupService.CreateGroupAsync(group);
            }
        }

        private static void InitSubjects(UnitOfWorkFillDB uow)
        {
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

            uow._context.Subjects.AddRange(subjects);
        }

        public static async Task InitUsers(UnitOfWorkFillDB uow,IUserService userService)
        {
            var registerUsers = new List<UserRegisterPayload>
                {
                    new UserRegisterPayload
                    {
                        Username = "user1",
                        Firstname = "John",
                        Lastname = "Doe",
                        Email = "user1@example.com",
                        Password = "Geheimnis123",
                        RepeatedPassword = "Geheimnis123"
                    },
                    new UserRegisterPayload
                    {
                        Username = "user2",
                        Firstname = "Jane",
                        Lastname = "Smith",
                        Email = "user2@example.com",
                        Password = "Geheimnis123",
                        RepeatedPassword = "Geheimnis123"
                    },
                    new UserRegisterPayload
                    {
                        Username = "user3",
                        Firstname = "David",
                        Lastname = "Johnson",
                        Email = "user3@example.com",
                        Password = "Geheimnis123",
                        RepeatedPassword = "Geheimnis123"
                    },
                    new UserRegisterPayload
                    {
                        Username = "user4",
                        Firstname = "Sarah",
                        Lastname = "Davis",
                        Email = "user4@example.com",
                        Password = "Geheimnis123",
                        RepeatedPassword = "Geheimnis123"
                    },
                    new UserRegisterPayload
                    {
                        Username = "user5",
                        Firstname = "Emily",
                        Lastname = "Wilson",
                        Email = "user5@example.com",
                        Password = "Geheimnis123",
                        RepeatedPassword = "Geheimnis123"
                    }
                };
            foreach (var user in registerUsers)
            {
                await userService.RegisterAsync(user);
            }

            List<User> users = await uow.GetAllUsersAsync();

            foreach (var user in users)
            {
                await userService.VerifyEmailAsync(await uow.GetVerificationTokenAsync(user.Id));
            }
        }
    }
}