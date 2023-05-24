// 首页
import { recommendMusic, getNewSong, getSwipeImg } from '@/api/Home.js'
export const recommendMusicAPI = recommendMusic
export const getNewSongAPI = getNewSong
export const getSwipeImgAPI = getSwipeImg


// 搜索
import { searchSong, hotSearch } from '@/api/search.js'
export const hotSearchAPI = hotSearch
export const searchSongAPI = searchSong

// 登录
import { getKey, creatrQr, checkQrStatus, checkLoginStatus, getCode, checkCode } from '@/api/login'
export const getKeyAPI = getKey
export const createQrAPI = creatrQr
export const checkQrStatusAPI = checkQrStatus
export const checkLoginStatusAPI = checkLoginStatus
export const getCodeAPI = getCode
export const checkCodeAPI =checkCode

// user
import { loginOut, getUserInfo, getPlayList } from "@/api/user"
export const loginOutAPI = loginOut
export const getUserInfoAPI = getUserInfo
export const getPlayListAPI = getPlayList

// play
import { getSongById, getLyricById } from "@/api/play"
export const getSongByIdAPI = getSongById
export const getLyricByIdAPI = getLyricById

// 歌单列表
import { getSongList } from "@/api/songlist"
export const getSongListAPI = getSongList