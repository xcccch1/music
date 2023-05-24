import {request} from '@/utils/request'

export const getSongById = (id) => {
    return request({
        url: `/song/detail?ids=${id}`
    })
}

export const getLyricById = (id) => {
    return request({
        url: `/lyric?id=${id}`
    })
}