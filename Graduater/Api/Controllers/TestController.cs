using Api.Controllers.EZCRUD;
using Core.Contracts.EZCRUD;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/TestObject")]
    public class TestController : EZCRUDEnpoint<CreateTestRequest, ReadTestRequest, DeleteTestRequest, Test, Guid, TestService>
    {
        public TestController()
        {
            ReadIdSelector = (model) => model.Id;
            DeleteIdSelector = (model) => model.Id;
        }
    }

    public class TestService : IEZCRUDService<CreateTestRequest, ReadTestRequest, DeleteTestRequest, Test, Guid>
    {
        public Task<Guid> CreateAsync(CreateTestRequest model)
        {
            throw new NotImplementedException();
        }

        public Task DeleteAsync(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task<Test> ReadAsync(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task UpdateAsync(Test model)
        {
            throw new NotImplementedException();
        }
    }

    public class Test
    {
        public Guid Id { get; set; }
        public string Val { get; set; }
    }

    public class DeleteTestRequest
    {
        public Guid Id { get; set; }
    }

    public class ReadTestRequest
    {
        public Guid Id { get; set; }
    }

    public class CreateTestRequest
    {
        public string Val { get; set; }
    }
}
