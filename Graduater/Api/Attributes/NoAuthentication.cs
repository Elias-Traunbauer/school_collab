namespace Ribbon.API.Attributes
{
    [AttributeUsage(AttributeTargets.Method)]
    public class NoAuthenticationRequired : Attribute
    {
        public NoAuthenticationRequired() 
        { 

        }
    }
}
