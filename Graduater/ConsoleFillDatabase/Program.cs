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
                Console.WriteLine("Daten werden importiert....");
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
            Console.WriteLine("<Taste drücken>");
            Console.ReadKey();
        }

        private static async Task InitSummaries(SummaryService summaryService)
        {
            var summaries = new List<CreateSummaryRequest>
            {
                new CreateSummaryRequest
                {
                    Title = "Differentialgleichung",
                    Description = "Zusammenfassung der Aufgabe 4 mit Erklärungen zur Differentialgleichung",
                    Content = "Laden Sie hier die Zusammenfassung hoch!",
                    SubjectId = 1
                },

                new CreateSummaryRequest
                {
                    Title = "Vektoren",
                    Description = "Zusammenfassung der Aufgabe 2 mit Erklärungen zu Vektoren",
                    Content = "Laden Sie hier die Zusammenfassung hoch!",
                    SubjectId = 1
                },

                new CreateSummaryRequest
                {
                    Title = "JmsWebsocket",
                    Description = "Zusammenfassung der Aufgabe 'JmsWebsocket' mit Erklärungen",
                    Content = "Laden Sie hier die Zusammenfassung hoch!",
                    SubjectId = 2
                },

                new CreateSummaryRequest
                {
                    Title = "Quarkus",
                    Description = "Zusammenfassung der letzten Hausübung mit einer Anleitung zum Erstellen einer Quarkus Applikation",
                    Content = "Laden Sie hier die Zusammenfassung hoch!",
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
                    Title = "Hausübung Statistik",
                    Description = "Beschreibende Statistik: bei der Wasserversorgung, Klettern und Erneuerbare Energien geht es um arithmetishces Mittel, Ausreißer, Kreisdiagramm und Säulendiagramm\r\n\r\n",
                    Content = "Bitte hier Ihre Lösung hochladen",
                    Due = DateTime.Now.AddDays(7),
                    GroupId = 1,
                    SubjectId = 1
                },
                new AssignmentPostPayload
                {
                    Title = "Hausübung Komplexe Zahlen",
                    Description = "Sieh dir selbstständig das Thema komplexe Zahlen aus der zweite Klasse an! Ab Buch Seite 184 - 209",
                    Content = "Bitte hier Ihre Lösung hochladen",
                    Due = DateTime.Now.AddDays(14),
                    GroupId = 1,
                    SubjectId = 1
                },
                new AssignmentPostPayload
                {
                    Title = "Hausübung Lasttest",
                    Description = "Führen Sie einen Lasttest einer Webapplikation durch.",
                    Content = "Bitte hier Ihre Lösung hochladen",
                    Due = DateTime.Now.AddDays(10),
                    GroupId = 1,
                    SubjectId = 2
                },
                new AssignmentPostPayload
                {
                    Title = "Hausübung JmsWebsocket",
                    Description = "Erstellen Sie eine Anwendung, die Aktienkurse mittels einer Queue an eine Webapplikation sendet. Die Webapplikation soll einen Websocket Endpoint bereitstellen, über den ein Webbrowser die Kurse in Echtzeit anzeigt.",
                    Content = "Bitte hier Ihre Lösung hochladen",
                    Due = DateTime.Now.AddDays(5),
                    GroupId = 1,
                    SubjectId = 2
                },
                new AssignmentPostPayload
                {
                    Title = "Hausübung 1",
                    Description = "Bericht über die Metadaten, Kurzbeschreibung der Daten, ausformulierte Fragestellung",
                    Content = "Bitte hier Ihre Lösung hochladen",
                    Due = DateTime.Now.AddDays(3),
                    GroupId = 1,
                    SubjectId = 3
                },
                new AssignmentPostPayload
                {
                    Title = "Hausübung 2",
                    Description = "Data Ware House Modell(PDF)",
                    Content = "Bitte hier Ihre Lösung hochladen",
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
                    Description = "Die Klasse der 5BHIF",
                    CreatorUserId = 1,
                    CreatorUser = null, // Set the creator user as needed
                    GroupUsers = null // Set the group users as needed
                },
                new Group
                {
                    Name = "5AHIF",
                    Description = "Die Klasse der 5AHIF",
                    CreatorUserId = 2,
                    CreatorUser = null, // Set the creator user as needed
                    GroupUsers = null // Set the group users as needed
                },
                new Group
                {
                    Name = "5CHIF",
                    Description = "Die Klasse der 5CHIF",
                    CreatorUserId = 3,
                    CreatorUser = null, // Set the creator user as needed
                    GroupUsers = null // Set the group users as needed
                },
                new Group
                {
                    Name = "5AHITM",
                    Description = "Die Klasse der 5AHITM",
                    CreatorUserId = 4,
                    CreatorUser = null, // Set the creator user as needed
                    GroupUsers = null // Set the group users as needed
                },
                new Group
                {
                    Name = "5BHITM",
                    Description = "Die Klasse der 5BHITM",
                    CreatorUserId = 5,
                    CreatorUser = null, // Set the creator user as needed
                    GroupUsers = null // Set the group users as needed
                },
                new Group
                {
                    Name = "5CHITM",
                    Description = "Die Klasse der 5CHITM",
                    CreatorUserId = 5,
                    CreatorUser = null, // Set the creator user as needed
                    GroupUsers = null // Set the group users as needed
                },
                new Group
                {
                    Name = "4AHIF",
                    Description = "Die Klasse der 4AHIF",
                    CreatorUserId = 5,
                    CreatorUser = null, // Set the creator user as needed
                    GroupUsers = null // Set the group users as needed
                },
                new Group
                {
                    Name = "4BHIF",
                    Description = "Die Klasse der 4BHIF",
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
                    Name = "Angewandte Mathematik",
                    ShortName = "AM"
            };

            Subject subject2 = new Subject
            {
                Id = 2,
                Name = "Netzwerksysteme und Verteilte Systeme",
                ShortName = "NVSV",
            };

            Subject subject3 = new Subject
            {
                Id = 3,
                Name = "Datenbanken und Informationssysteme",
                ShortName = "DBI",
            };

            Subject subject4 = new Subject
            {
                Id = 4,
                Name = "Betriebswirtschaft und Management",
                ShortName = "BWM",
            };

            Subject subject5 = new Subject
            {
                Id = 5,
                Name = "Systemplanung und Projektentwicklung",
                ShortName = "Syp",
            };

            Subject subject6 = new Subject
            {
                Id = 6,
                Name = "Programmieren und Software Enineering",
                ShortName = "POSE",
            };

            Subject subject7 = new Subject
            {
                Id = 7,
                Name = "Deutsch",
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