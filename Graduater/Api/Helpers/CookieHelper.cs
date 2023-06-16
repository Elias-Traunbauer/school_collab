namespace Api.Helpers
{
    public static class CookieHelper
    {
        public static void SetCookie(this HttpResponse httpResponse, string key, string value, DateTime expires, string path = "/", bool secure = true, bool httpOnly = true)
        {
            httpResponse.Cookies.Append(key, value, new CookieOptions()
            {
                Path = path,
                Expires = expires,
                Secure = secure,
                HttpOnly = httpOnly
            });
        }

        public static void DeleteCookie(this HttpResponse httpResponse, string key, string path = "/", bool secure = true, bool httpOnly = true)
        {
            httpResponse.Cookies.Append(key, "", new CookieOptions()
            {
                Path = path,
                Expires = DateTime.UtcNow.AddYears(-1),
                Secure = secure,
                HttpOnly = httpOnly
            });
        }
    }
}