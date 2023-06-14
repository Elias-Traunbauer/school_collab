using Persistence;

namespace ConsoleFillDatabase
{
    internal class Program
    {
        static void Main(string[] args)
        {
            using (UnitOfWork uow = new UnitOfWork())
            {
                Console.WriteLine("Daten werden importiert....");
                uow.FillDBAsync().GetAwaiter().GetResult();
                Console.WriteLine("Done!");
            }
            Console.WriteLine("<Taste drücken>");
            Console.ReadKey();
        }
    }
}