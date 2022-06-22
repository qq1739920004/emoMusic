import {LRequest} from './Service'
//歌曲信息
export function musicService(ids:number|string){
  return LRequest.get("/song/detail",{
    ids
  })
}
//请求歌词
export function musicLyric(id:number|string) {
  return LRequest.get("/lyric",{
    id
  })
}