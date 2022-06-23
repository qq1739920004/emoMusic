const { HYEventStore } = require("hy-event-store")
import {musicService,musicLyric} from '../service/musicDtailedService'
import {lyricHandle} from '../utils/lyricHandle'

const audio=wx.getBackgroundAudioManager()
audio.onEnded(()=>{
  musicDetailStore.dispatch('nextMusuc')
})
audio.onError(()=>{
  musicDetailStore.dispatch('nextMusuc')
})

const musicDetailStore = new HYEventStore({
  state:{
    //动画加载
    isLoading:true,
    //歌曲列表
    musicList:[],
    musicListIndex:0,

    //歌曲信息
    musicInfo:{},
    musicLyric:{},
    id:'',
    //控制当前歌曲环境
    presentTime:'0' as any,
    presentStep:0,
    presentLyric:'',
    presentLyricIndex:0,
    isNext:true,
    //控制歌曲的按钮
    butStart:true,
    butStartImg:'play_pause',
    butPlayMethod:0,//0列表循环，1单曲循环，2随机播放
    butPlayMethodImg:'play_order'
    
  },
  
  actions:{
    getMusicInfo(ctx:any,musicid:any){
      console.log(ctx.isNext);
      
      if (musicid===ctx.id && !ctx.isNext) {
        console.log(222);
        
        musicDetailStore.dispatch('butHandle')
        return
      }
      //初始化属性防止换歌还有上一首的画面残余
      ctx.musicInfo={}
      ctx.musicLyric={}
      ctx.presentTime=0
      ctx.presentStep=0
      ctx.presentLyric=''
      ctx.presentLyricIndex=0
      
         //歌曲信息
      musicService(musicid).then(res=>{
        ctx.musicInfo=res
        ctx.id=musicid
        audio.title=ctx.id
        audio.title=res.songs[0].name
        audio.src=`https://music.163.com/song/media/outer/url?id=${ctx.id}`
        })
        // 歌词信息
        musicLyric(musicid).then(res=>{
          // 处理歌词成一个数组
          if (res.lrc?.lyric!==undefined) {
          const lyric=lyricHandle(res.lrc.lyric)
          ctx.musicLyric=lyric
          ctx.presentLyric=ctx.musicLyric[0].value
        }
        })     
      //音乐播放环境
      audio.stop()
      audio.onPause(()=>{
        ctx.butStart=false
        musicDetailStore.dispatch('butHandle')
      })
      audio.onPlay(()=>{
        ctx.butStart=true
        musicDetailStore.dispatch('butHandle')
      })
      // 开始播放
      audio.onCanplay(()=>{
        audio.play()
        if (ctx.butStart===true) {
          musicDetailStore.dispatch('timeUpdate')
        }
        else{
          ctx.butStart=true
          musicDetailStore.dispatch('butHandle')
        }
      })
    },
   timeUpdate(ctx:any){
    audio.onTimeUpdate(()=>{
      ctx.isNext=false
      let time=audio.currentTime*1000
      ctx.presentTime=time
      musicDetailStore.dispatch('lyricSet')
      if(Object.keys(ctx.musicInfo.songs?ctx.musicInfo.songs:{}).length){
      const step=(ctx.presentTime/ctx.musicInfo.songs[0].dt)*100
      ctx.presentStep=step
    }
  })
    },
     //找出给当前歌词
  lyricSet(ctx:any){
    let lyricText
    for(let i=0;i<=ctx.musicLyric.length;i++){
      if(ctx.musicLyric[i]?.time>=ctx.presentTime){
        lyricText= ctx.musicLyric[i-1]
        ctx.presentLyricIndex=(i-1===-1)?0:i-1
        break
      }
    }
     //当前歌词
     if(lyricText?.value){
       if(lyricText.value!==ctx.presentLyric){
         ctx.presentLyric=lyricText.value
       }
     }
  },
  butHandle(ctx:any){
    //暂停或者播放歌曲
    if(!ctx.butStart){
      audio.pause()
      ctx.butStartImg='play_resume'
    }
    else{
      audio.play()
      ctx.butStartImg='play_pause'
    }
  },
  butPlaymethodHanled(ctx:any){
    if(ctx.butPlayMethod===0){
      ctx.butPlayMethod=1
      ctx.butPlayMethodImg='play_repeat'
    }
    else if(ctx.butPlayMethod===1){
      ctx.butPlayMethod=2
      ctx.butPlayMethodImg='play_random'
    }
    else{
      ctx.butPlayMethod=0
      ctx.butPlayMethodImg='play_order'
    }
  },
  //上一首
  prevMusic(ctx:any){
    //列表循环
    if (ctx.butPlayMethod===0) {
      ctx.isNext=false

      if (ctx.musicListIndex==0) {
        ctx.musicListIndex=ctx.musicList.length
      }
      musicDetailStore.dispatch("getMusicInfo",ctx.musicList[ctx.musicListIndex-1].id)
      ctx.musicListIndex=ctx.musicListIndex-1
      console.log(ctx.musicListIndex);
    }
    //单曲循环
    else if (ctx.butPlayMethod===1) {
      ctx.isNext=true

      musicDetailStore.dispatch("getMusicInfo",ctx.musicList[ctx.musicListIndex].id)
    }
    //随机循环
    else{
      ctx.isNext=false

      const random=Math.floor(Math.random()*ctx.musicList.length)
      musicDetailStore.dispatch("getMusicInfo",ctx.musicList[random].id)
    }
     

  },
  //下一首
  nextMusuc(ctx:any){
    if (ctx.butPlayMethod===0) {
      ctx.isNext=false

      if (ctx.musicListIndex==ctx.musicList.length-1) {
        ctx.musicListIndex=-1
      }
      musicDetailStore.dispatch("getMusicInfo",ctx.musicList[ctx.musicListIndex+1].id)
      ctx.musicListIndex=ctx.musicListIndex+1
    }
    //单曲循环
    else if (ctx.butPlayMethod===1) {
      ctx.isNext=true
      musicDetailStore.dispatch("getMusicInfo",ctx.musicList[ctx.musicListIndex].id)
    }
    //随机循环
    else{
      ctx.isNext=false
      const random=Math.floor(Math.random()*ctx.musicList.length)
      musicDetailStore.dispatch("getMusicInfo",ctx.musicList[random].id)
    }
  },
}
})

export {musicDetailStore,audio}

