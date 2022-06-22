// components/music-lyric/index.ts
import {musicDetailStore} from '../../store/index'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    screenHeight:{
      type:Number
    },
    statusBarHeight:{
      type:Number
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    musicLyric:[] as any[],
    presentLyricIndex:0,
    scrollTopSize:0,
  },
  lifetimes:{
    created(){
      musicDetailStore.onState('musicLyric',(res:any)=>{
        this.setData({musicLyric:res})
      }),
      musicDetailStore.onState('presentLyricIndex',(res:any)=>{
        this.setData({scrollTopSize:res*40})
        this.setData({presentLyricIndex:res})
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
