function setCookie(name, value) {
    document.cookie = name + "=" + value + ";";
}

function getCookie(c_name) {
    var i, x, y, ARRcookies = document.cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        while (x.substr(0, 1) == ' ') {
            x = x.substr(1, x.length);
        }
        while (x.substr(x.length - 1, x.length) == ' ') {
            x = x.substr(0, x.length - 1);
        }
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        if (x == c_name) {
            return y;
        }
    }
}