namespace Persistence
{
    public class ApiConfig
    {
        public string Secret { get; set; } = string.Empty;
        public string Issuer { get; set; } = string.Empty;
        public TimeSpan AccessTokenLifetime { get; set; }
        public TimeSpan RefreshTokenLifetime { get; set; }

        public int UploadMaxFileSize { get; set; }
        public string[] PermittedFileExtensions { get; set; } = new string[0];

        public TimeSpan EmailVerificationTokenLifetime { get; set; }
        public TimeSpan PasswordResetTokenLifetime { get; set; }

        public string AccessTokenCookieIdentifier { get; set; } = string.Empty;
        public string RefreshTokenCookieIdentifier { get; set; } = string.Empty;

        public string? DatabaseConnectionString { get; set; }
    }
}