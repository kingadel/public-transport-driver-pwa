export const navigateTo = (navigator, page, state) => {
    navigator("/" + page, {state: state})
}

export function formatNumber(number) {
    return new Intl.NumberFormat('en-IN', {maximumSignificantDigits: 3}).format(number)
}

export function saveUserInLocalStorage(user) {
    localStorage.setItem('user', JSON.stringify(user))
}

export function saveToken(token) {
    localStorage.setItem('ib-token', token)
}

export function getToken() {
    return localStorage.getItem('ib-token')
}

export function getPersianDate(dateTime) {
    return new Date(dateTime).toLocaleDateString('fa-IR', {weekday: 'long', month: 'long', day: 'numeric'})
}

export function getTruckNames(trailer) {
    let truckNames = ''
    trailer.trailerTypes?.forEach((item)=>{
        truckNames = item.name +` `+ truckNames
    })
    return truckNames
}

export function locationError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            return "شما قبلا اجازه استفاده از موقعیت مکانی خود را رد کرده‌اید.";
        case error.POSITION_UNAVAILABLE:
            return "Location information is currently unavailable.";
        case error.TIMEOUT:
            return "Request for user location timed out.";
        case error.UNKNOWN_ERROR:
            return "An unknown error occurred.";
    }
}

export function getUserFromLocalStorage() {
    const userString = localStorage.getItem('user')
    let user
    try {
        user = JSON.parse(userString)
    } catch (e) {
        user = null
    }
    return user
}

export function removeUserFromLocalStorage() {
    localStorage.setItem('user', null)
}

export const callSupportClick = () => {
    window.open('tel:09936788810');
}

export const isIos = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);
};

export const isInStandaloneMode = () =>
    'standalone' in window.navigator && window.navigator.standalone;


export function getOS() {
    let userAgent = window.navigator.userAgent,
        platform = window.navigator.platform,
        macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
        windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
        iosPlatforms = ['iPhone', 'iPad', 'iPod'],
        os = null;

    if (macosPlatforms.indexOf(platform) !== -1) {
        os = 'Mac OS';
    } else if (iosPlatforms.indexOf(platform) !== -1) {
        os = 'iOS';
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
        os = 'Windows';
    } else if (/Android/.test(userAgent)) {
        os = 'Android';
    } else if (!os && /Linux/.test(platform)) {
        os = 'Linux';
    }

    return os;
}

export function getBrowser() {
    if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) !== -1) {
        return ('Opera');
    } else if (navigator.userAgent.indexOf("Chrome") !== -1) {
        return ('Chrome');
    } else if (navigator.userAgent.indexOf("Safari") !== -1) {
        return ('Safari');
    } else if (navigator.userAgent.indexOf("Firefox") !== -1) {
        return ('Firefox');
    } else if ((navigator.userAgent.indexOf("MSIE") !== -1) || (!!document.documentMode === true)) //IF IE > 10
    {
        return ('IE');
    } else {
        return ('unknown');
    }
}
