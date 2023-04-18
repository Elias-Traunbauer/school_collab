namespace Core.Contracts.Models
{
    public interface IUserPasswordResetPayload
    {
        public string Token { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
    }
}