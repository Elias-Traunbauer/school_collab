using Core.Entities.Database;

namespace Core.Contracts.Entities
{
    public interface IPollOption
    {
        string Name { get; set; }
        Poll? Poll { get; set; }
        int PollId { get; set; }
        int Votes { get; set; }
    }
}