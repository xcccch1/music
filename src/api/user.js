import {request} from "@/utils/request"

export const loginOut = () => {
    return request({
        url: '/logout'
    })
}

export const getUserInfo = uid => {
    return request({
        method: "post",
        url: "/user/detail",
        params: {
            uid
        }
    })
}

export const getPlayList = uid => {
    return request({
        url: "/user/playlist",
        params: {
            uid
        }
    })
}

