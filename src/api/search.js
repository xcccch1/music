import {request} from '@/utils/request'

export const hotSearch = params => {
    return request({
        url: '/search/hot',
        params
    })
}

export const searchSong = params => {
    return request({
        url: '/cloudsearch',
        params
    })
}