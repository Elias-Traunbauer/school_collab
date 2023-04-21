using Core.Entities.Database;

namespace Core.Contracts.Entities
{
    public interface IFile
    {
        byte[] Content { get; set; }
        string Name { get; set; }
        long Size { get; }
        User? UploadedBy { get; set; }
        int UploadedById { get; set; }
    }
}