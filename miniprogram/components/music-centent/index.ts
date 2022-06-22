// components/music-centent/index.ts
import {audio} from '../../global-attribute/idnex'
import {musicDetailStore} from '../../store/index'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    statusBarHeight:{
      type:Number
    },
    screenHeight:{
      type:Number
    },
    musicId:{
      type:Number
    },
    isShowLyric:{
      type:Boolean
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    //歌曲列表
    musicList:[] as any[],
    musicListIndex:0,

    musicInfo:{} as any,
    musicLyric:[] as any[],

    presentTime:'0' as any,
    presentStep:0,
    presentLyric:'',
    isStep:true,//拖动进度条的时候让进度条缓动取消

    //控制歌曲的按钮
    butStart:true,
    butStartImg:'play_pause',
    butPlayMethod:0,//0列表循环，1单曲循环，2随机播放
    butPlayMethodImg:'play_order'
  },
  lifetimes:{
    attached(){
      musicDetailStore.dispatch("getMusicInfo",this.properties.musicId)
       //歌曲信息,//歌词信息
       musicDetailStore.onStates(['musicInfo','musicLyric'],(res:any)=>{
        if(res.musicInfo!==undefined) this.setData({musicInfo:res.musicInfo})
        if(res.musicLyric) this.setData({musicLyric:res.musicLyric})
      })
      //按钮信息
      musicDetailStore.onStates(['butStart','butStartImg','butPlayMethod','butPlayMethodImg','musicList','musicListIndex'],(res:any)=>{
        console.log(res);
        if(res.butStart!==undefined) this.setData({butStart:res.butStart})
        if(res.butStartImg) this.setData({butStartImg:res.butStartImg})
        if(res.butPlayMethod!==undefined) this.setData({butPlayMethod:res.butPlayMethod})
        if(res.butPlayMethodImg) this.setData({butPlayMethodImg:res.butPlayMethodImg})
        if(res.musicList!==undefined) this.setData({musicList:res.musicList})
        if(res.musicListIndex!==undefined) this.setData({musicListIndex:res.musicListIndex})

       })
       
      this.audioContext()
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //暂停
    startStopChange(){
      musicDetailStore.setState('butStart',!this.data.butStart)
      musicDetailStore.dispatch('butHandle')
    },
    //改变播放模式
    methodChange(){
      musicDetailStore.dispatch('butPlaymethodHanled')
    },
    //上一首
    prevMusic(){
      if (this.data.musicListIndex==0) {
        musicDetailStore.setState('musicListIndex',this.data.musicList.length)
      }
      musicDetailStore.dispatch("getMusicInfo",this.data.musicList[this.data.musicListIndex-1].id)
      musicDetailStore.setState("musicListIndex",this.data.musicListIndex-1)
    },
    //下一首
    nextMusuc(){
      if (this.data.musicListIndex==this.data.musicList.length-1) {
        musicDetailStore.setState('musicListIndex',-1)
      }
      musicDetailStore.dispatch("getMusicInfo",this.data.musicList[this.data.musicListIndex+1].id)
      musicDetailStore.setState("musicListIndex",this.data.musicListIndex+1)
    },
//音乐播放环境
    audioContext(){
      //准备好音乐源的hook
      musicDetailStore.onStates(['presentTime','presentStep','presentLyric'],(res:any)=>{
        if(res.presentTime)                     this.setData({presentTime:res.presentTime})
        if(res.presentStep && this.data.isStep) this.setData({presentStep:res.presentStep})
        //当前歌词赋值
        if(res.presentLyric)                    this.setData({presentLyric:res.presentLyric})
      })
  },
  
  
  // 点击度条促发
  sliderChange(e:any){
    let time=e.detail.value
    this.setData({isStep:true})
    this.setData({presentTime:time*this.data.musicInfo.songs[0].dt/100})
    audio.pause()
    audio.seek(this.data.presentTime/1000)
    musicDetailStore.dispatch('timeUpdate')
  },
  // 拖动进度条促发
  sliderChanging(e:any){
    if(this.data.isStep){
      this.setData({isStep:false})
    }
    let time=e.detail.value
    this.setData({presentTime:time*this.data.musicInfo.songs[0].dt/100})
  }
  }
})
