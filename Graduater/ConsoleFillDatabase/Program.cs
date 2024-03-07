using Core.Contracts;
using Core.Contracts.Models;
using Core.Contracts.Services;
using Core.Entities.Database;
using Mysqlx.Crud;
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
                Console.WriteLine("Importing data....");
                await uow.Init();


                ApiConfig config = new ApiConfig();
                JsonWebTokenService jsonWebTokenService = new JsonWebTokenService(config);
                PasswordService passwordService = new PasswordService();
                RandomKeyService randomKeyService = new RandomKeyService();
                UserService userService = new UserService(uow, jsonWebTokenService, passwordService, randomKeyService);
                GroupService groupService = new GroupService(uow, config);
                AssignmentService assignmentService = new AssignmentService(uow);
                SummaryService summaryService = new SummaryService(uow);

                InitSubjects(uow);
                await uow.SaveChangesAsync();
                await InitUsers(uow, userService);
                await InitGroups(groupService);
                await InitAssignments(assignmentService);
                await InitSummaries(summaryService);



                await uow.SaveChangesAsync();

                Console.WriteLine("Done!");
            }
            Console.WriteLine("<Press key>");
            Console.ReadKey();
        }

        private static async Task InitSummaries(SummaryService summaryService)
        {
            var summaries = new List<CreateSummaryRequest>
            {
                new CreateSummaryRequest
                {
                    Title = "Differential equation",
                    Description = "Summary of task 4 with explanations of the differential equation",
                    Content = "Upload the summary here!",
                    SubjectId = 1
                },

                new CreateSummaryRequest
                {
                    Title = "Vectors",
                    Description = "Summary of task 2 with explanations of vectors",
                    Content = "Upload the summary here!",
                    SubjectId = 1
                },

                new CreateSummaryRequest
                {
                    Title = "JmsWebsocket",
                    Description = "Summary of the JmsWebsocket task with explanations",
                    Content = "Upload the summary here!",
                    SubjectId = 2
                },

                new CreateSummaryRequest
                {
                    Title = "Quarkus",
                    Description = "Summary of the last homework exercise with instructions for creating a Quarkus application",
                    Content = "Upload the summary here!",
                    SubjectId = 2
                },
            };

            foreach (var item in summaries)
            {
                await summaryService.CreateAsync(item);
            }
        }

        private static async Task InitAssignments(AssignmentService assignmentService)
        {
            var assignments = new List<AssignmentPostPayload>
            {
                new AssignmentPostPayload
                {
                    Title = "Statistics home exercise",
                    Description = "Descriptive statistics: water supply, climbing and renewable energy are about arithmetical means, outliers, pie chart and column chart",
                    Content = "Please upload your solution here",
                    Due = DateTime.Now.AddDays(7),
                    GroupId = 1,
                    SubjectId = 1
                },
                new AssignmentPostPayload
                {
                    Title = "Home exercise complex numbers",
                    Description = "Check out the complex numbers topic from second grade on your own! From book pages 184 - 209",
                    Content = "Please upload your solution here",
                    Due = DateTime.Now.AddDays(14),
                    GroupId = 1,
                    SubjectId = 1
                },
                new AssignmentPostPayload
                {
                    Title = "Home exercise load test",
                    Description = "Carry out a load test of a web application.",
                    Content = "Please upload your solution here",
                    Due = DateTime.Now.AddDays(10),
                    GroupId = 1,
                    SubjectId = 2
                },
                new AssignmentPostPayload
                {
                    Title = "Home exercise JmsWebsocket",
                    Description = "Create an application that sends stock prices to a web application using a queue. The web application is intended to provide a web socket endpoint through which a web browser displays the prices in real time.",
                    Content = "Please upload your solution here",
                    Due = DateTime.Now.AddDays(5),
                    GroupId = 1,
                    SubjectId = 2
                },
                new AssignmentPostPayload
                {
                    Title = "Home exercise 1",
                    Description = "Report on the metadata, short description of the data, formulated question",
                    Content = "Please upload your solution here",
                    Due = DateTime.Now.AddDays(3),
                    GroupId = 1,
                    SubjectId = 3
                },
                new AssignmentPostPayload
                {
                    Title = "Home exercise 2",
                    Description = "Data Warehouse House Model (PDF)",
                    Content = "Please upload your solution here",
                    Due = DateTime.Now.AddDays(3),
                    GroupId = 1,
                    SubjectId = 3
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
                    Name = "5BHIF",
                    Description = "The class 5BHIF",
                    CreatorUserId = 1,
                    CreatorUser = null, // Set the creator user as needed
                    GroupUsers = null // Set the group users as needed
                },
                new Group
                {
                    Name = "5AHIF",
                    Description = "The class 5AHIF",
                    CreatorUserId = 2,
                    CreatorUser = null, // Set the creator user as needed
                    GroupUsers = null // Set the group users as needed
                },
                new Group
                {
                    Name = "5CHIF",
                    Description = "The class 5CHIF",
                    CreatorUserId = 3,
                    CreatorUser = null, // Set the creator user as needed
                    GroupUsers = null // Set the group users as needed
                },
                new Group
                {
                    Name = "5AHITM",
                    Description = "The class 5AHITM",
                    CreatorUserId = 4,
                    CreatorUser = null, // Set the creator user as needed
                    GroupUsers = null // Set the group users as needed
                },
                new Group
                {
                    Name = "5BHITM",
                    Description = "The class 5BHITM",
                    CreatorUserId = 5,
                    CreatorUser = null, // Set the creator user as needed
                    GroupUsers = null // Set the group users as needed
                },
                new Group
                {
                    Name = "5CHITM",
                    Description = "The class 5CHITM",
                    CreatorUserId = 5,
                    CreatorUser = null, // Set the creator user as needed
                    GroupUsers = null // Set the group users as needed
                },
                new Group
                {
                    Name = "4AHIF",
                    Description = "The class 4AHIF",
                    CreatorUserId = 5,
                    CreatorUser = null, // Set the creator user as needed
                    GroupUsers = null // Set the group users as needed
                },
                new Group
                {
                    Name = "4BHIF",
                    Description = "The class 4BHIF",
                    CreatorUserId = 5,
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
                    Name = "Mathematics",
                    ShortName = "AM"
            };

            Subject subject2 = new Subject
            {
                Id = 2,
                Name = "Network systems and distributed systems",
                ShortName = "NVSV",
            };

            Subject subject3 = new Subject
            {
                Id = 3,
                Name = "Databases and information systems",
                ShortName = "DBI",
            };

            Subject subject4 = new Subject
            {
                Id = 4,
                Name = "Business and Management",
                ShortName = "BWM",
            };

            Subject subject5 = new Subject
            {
                Id = 5,
                Name = "System planning and project development",
                ShortName = "Syp",
            };

            Subject subject6 = new Subject
            {
                Id = 6,
                Name = "Programming and software engineering",
                ShortName = "POSE",
            };

            Subject subject7 = new Subject
            {
                Id = 7,
                Name = "German",
                ShortName = "D",
            };

            List<Subject> subjects = new List<Subject> { subject1, subject2, subject3, subject4, subject5, subject6, subject7 };

            uow._context.Subjects.AddRange(subjects);
        }

        public static async Task InitUsers(UnitOfWorkFillDB uow,IUserService userService)
        {
            var registerUsers = new List<UserRegisterPayload>
                {
                    new UserRegisterPayload
                    {
                        Username = "lfuchsjaeger",
                        Firstname = "Luca",
                        Lastname = "Fuchsjäger",
                        Email = "l.fuchsjaeger@icloud.com",
                        Password = "Geheimnis123",
                        RepeatedPassword = "Geheimnis123"
                    },
                    new UserRegisterPayload
                    {
                        Username = "erausch",
                        Firstname = "Elias",
                        Lastname = "Rausch",
                        Email = "e.rausch@icloud.com",
                        Password = "Geheimnis123",
                        RepeatedPassword = "Geheimnis123"
                    },
                    new UserRegisterPayload
                    {
                        Username = "etraunbauer",
                        Firstname = "Elias",
                        Lastname = "Traunbauer",
                        Email = "e.traunbauer@gmail.com",
                        Password = "Geheimnis123",
                        RepeatedPassword = "Geheimnis123"
                    },
                    new UserRegisterPayload
                    {
                        Username = "mmustermann",
                        Firstname = "Max",
                        Lastname = "Mustermann",
                        Email = "m.mustermann@gmail.com",
                        Password = "Geheimnis123",
                        RepeatedPassword = "Geheimnis123"
                    },
                    new UserRegisterPayload
                    {
                        Username = "jdoe",
                        Firstname = "John",
                        Lastname = "Doe",
                        Email = "j.doe@gmx.com",
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