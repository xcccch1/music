import {request} from '@/utils/request'

export const getKey = () => {
    return request({
        url: `/login/qr/key?timerstamp=${Date.now()}`,
        withCredentials: true
    })
}

export const creatrQr = key => {
    return request({
        url: `/login/qr/create?key=${key}&qrimg=true&timerstamp${Date.now()}`,
        withCredentials: true
    })
}

export const checkQrStatus = key => {
    return request({
        url: `/login/qr/check?key=${key}&timerstamp${Date.now()}`,
        withCredentials: true
    })
}

export const checkLoginStatus = (cookie = '') => {
    return request({
        method: 'post',
        url: `/login/status?timerstamp=${Date.now()}`,
        data: {
            cookie
        }
    })
}

export const getCode = phoneNum =>{
    return request({
        url:`/captcha/sent?phone=${phoneNum}&timerstamp=${Date.now()}`
    })
}

export const checkCode = (phone,code)=>{
    return request({
        url:`/captcha/verify?phone=${phone}&captcha=${code}&timerstamp=${Date.now()}`
    })
}