export function lyricHandle(lyric:string) {
  let lyricArray:any=[]
  const lyricSplit=lyric.split('\n')
  const lyricRegexp=/\[(\d{2}):(\d{2}).(\d{2,3})\]/
  for(let i of lyricSplit){
    const lyricIndex:any=lyricRegexp.exec(i)
    let timeSum
    if(!lyricIndex) continue
    //把分钟制转成毫秒制
    const time3=lyricIndex[3].length===2?Number(lyricIndex[3])*10:Number(lyricIndex[3])
    timeSum=Number(lyricIndex[1])*60*1000+Number(lyricIndex[2])*1000+time3
    //把转换的一句歌词放到对象里面
    //因为有的歌词直接是事件点，所以需要三目运算符判断一下
    lyricArray.push({time:timeSum,value:lyricRegexp.exec(i.replace(lyricIndex[0]+'',''))?'':i.replace(lyricIndex[0]+'','')})
  }
  
  return lyricArray
}