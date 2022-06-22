import {LRequest} from './Service'
// 获取视频列表
export function getTopMV(offset:number,limit=10){
  return LRequest.get("/top/mv",{
    offset:offset,
    limit:limit,
  })
}
// 获取对应 MV 数据 , 数据包含 mv 名字 , 歌手 , 发布时间等数据 
export function getMVInfo(id:number|string){
  return LRequest.get("/mv/detail",{
    mvid:id
  })
}

// 调用此接口 , 传入 mv id,可获取 mv 播放地址
export function getMVAddress(id:number|string){
  return LRequest.get("/mv/url",{
    id
  })
}

// 调用此接口 , 可获取相关视频

export function getMVRelation(id:number|string){
  return LRequest.get("/related/allvideo",{
    id
  })
}