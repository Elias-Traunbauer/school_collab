using Core.Entities.Database;

namespace Core.Contracts.Entities
{
    public interface IFile
    {
        byte[] Content { get; set; }
        string Name { get; set; }
        string ContentType { get; set; }
        string MIME_Type { get; set; }
        long Size { get; }
        User? UploadedBy { get; set; }
        int UploadedById { get; set; }
    }
}