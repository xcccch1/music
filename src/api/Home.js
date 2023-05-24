import {request} from '@/utils/request'

export const recommendMusic = params => {
    return request({
        url: '/personalized',
        params
    })
}

export const getNewSong = params => {
    return request({
        url: '/personalized/newsong',
        params
    })
}

export const getSwipeImg = params => {
    return request({
        url: '/banner?type=2',
        params
    })
}