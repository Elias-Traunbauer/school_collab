namespace Core.Contracts.Models
{
    public class UserPasswordResetPayload : IUserPasswordResetPayload
    {
        public string Token { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string RepeatPassword { get; set; } = string.Empty;
    }
}