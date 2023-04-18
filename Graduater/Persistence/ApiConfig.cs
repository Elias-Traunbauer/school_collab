using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence
{
    public class ApiConfig
    {
        public string Secret { get; set; } = string.Empty;
        public string Issuer { get; set; } = string.Empty;
        public TimeSpan AccessTokenLifetime { get; set; }
        public TimeSpan RefreshTokenLifetime { get; set; }

        public TimeSpan EmailVerificationTokenLifetime { get; set; }
        public TimeSpan PasswordResetTokenLifetime { get; set; }

        public string AccessTokenCookieIdentifier { get; set; } = string.Empty;
        public string RefreshTokenCookieIdentifier { get; set; } = string.Empty;

        public string? DatabaseConnectionString { get; set; }
    }
}
