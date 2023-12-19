# EntityFramework.LargeBlobs

EntityFramework.LargeBlobs is a powerful package designed to simplify the storage, retrieval, and management of large binary objects (blobs) within Entity Framework. With this package, you can effortlessly store blobs of any size in your database, enabling seamless integration and management of binary data within your applications.

## Features

- **Effortless Blob Storage:** Store blobs of any size using the provided entities and services without worrying about limitations on binary data storage.
- **Flexible Integration:** Easily integrate LargeBlobs into your existing Entity Framework Core application by inheriting from the provided DbContext class.
- **Simple API:** The package offers straightforward service methods for storing, reading, and deleting blobs, streamlining the management of large binary data within your application.

## Usage
- Ensure that your EF AppDbContext, inherits from 'EFLargeBlobApplicationDbContext'
- Be sure that if you use DI, that your ApplicationDbContext (the one you just made sure inherits), is registered as a scoped service.
- Register another scoped service, <IEFLargeBlobService<YourApplicationDbContextType>, EFLargeBlobService<YourApplicationDbContextType>>
