using Core.Contracts.Models;

namespace Core.Entities.Models
{
    public class LoginResult : ILoginResult
    {
        public IServiceResult ServiceResult { get; set; } = new ServiceResult();
        public string? AccessToken { get; set; }
        public string? RefreshToken { get; set; }
        public bool TwoFactorAuthenticationEnabled { get; set; }
    }
}