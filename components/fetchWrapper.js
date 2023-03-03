


async function secureFetch(url, options) {
    const update = { ...options };
    if (localStorage.jwt) {
      update.headers = {
        ...update.headers,
        anti_csrf_token: getCookie('anti_csrf_token'),
      };
    }
    return fetch(url, options);
}

function getCookie(name) {
    var cookieArr = document.cookie.split(";");
    for(var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");
        if(name == cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return null;
}

export default secureFetch;