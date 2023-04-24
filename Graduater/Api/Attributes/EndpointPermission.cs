using Core.Entities.Database;

namespace Api.Attributes
{
    [AttributeUsage(AttributeTargets.Method)]
    public class EndpointPermission : Attribute
    {
        public UserPermission Required { get; set; }

        public EndpointPermission(UserPermission permissions)
        { 
            Required = permissions;
        }
    }
}
