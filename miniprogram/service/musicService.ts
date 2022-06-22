import {LRequest} from './Service'
// 请求轮播图数据
export function swiperService() {
  return LRequest.get("/banner", {
    type: 2
  })
}
// 请求热门歌曲列表
export function hotMusicService() {
  return LRequest.get("/recommend/songs", {
    cookie:wx.getStorageSync('token')
  })
}
// 请求热门歌单列表
export function hotSongMenu(cat:string='全部',limit:number=7,offset:number=0){
  return LRequest.get("/top/playlist", {
    cat,
    limit,
    offset
  })
}
// 请求精选歌单列表
export function handpickMenu(cat:string='全部',limit:number=7,offset:number=0){
  return LRequest.get("/top/playlist/highquality",{
  cat,
  limit,
  offset
})
}
/*请求所有榜单前三首数据数据
lsit[0]:飙升榜
lsit[1]:新歌榜
lsit[2]:原创榜
lsit[3]:热歌榜
*/
export function rankingMenu(){
  return LRequest.get("/toplist/detail")
}
//请求歌单的详细信息
export function rankingDetail(id:number|string){
  return LRequest.get("/playlist/detail",{
    id
  })
}
//请求歌单的全部歌曲
export function menuAllMusic(id:number|string){
  return LRequest.get("/playlist/track/all",{
    id
  })
}
