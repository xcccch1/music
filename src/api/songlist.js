import {request} from "@/utils/request"

export const getSongList = (id) => {
    return request({
        url: `/playlist/detail?id=${id}`
    })
}