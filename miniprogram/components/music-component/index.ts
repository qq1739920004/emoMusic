// components/music-component/index.ts
import {musicDetailStore} from '../../store/musicDetaile'
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    musicInfo:{} as any,
    butStart:true
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
  },
  lifetimes:{
    created(){
      
      musicDetailStore.onStates(['musicInfo','butStart'],(res:any)=>{
        
         if(res.musicInfo!==undefined) this.setData({musicInfo:res.musicInfo})
         if(res.butStart!==undefined) this.setData({butStart:res.butStart})
        console.log();
         
      })
    }
  }
})
