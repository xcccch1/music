import Cookies from "js-cookie";

export const getCookie = key => {
    let result = key ? Cookies.get(key) : Cookies.get()
    return result
}

export const setCookie = (key ="", value, expiresTime) => {
    let seconds = expiresTime
    let expires = new Date(new Date() * 1 + seconds * 1000)
    return Cookies.set(key, value, { expires: expires })
}

export const removeCookie = key => {
    return Cookies.remove(key)
}

export const setCookies = (parmas, expiresTime = 300) => {
    const keysArr = Object.keys(parmas)
    keysArr.forEach(element => {
        setCookie(element, parmas[element], expiresTime)
    })
}

export const removeAllCookie = () => {
    Object.keys(getCookie()).forEach(element => {
        removeCookie(element)
    })
}