namespace Api.Attributes
{
    [AttributeUsage(AttributeTargets.Method)]
    public class NoAuthenticationRequired : Attribute
    {
        public NoAuthenticationRequired()
        {
        }
    }
}