// components/music-list/index.ts
import {musicDetailStore} from '../../store/musicDetaile'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    musicList:{
      type:Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    skipMusicDtaile(e:any){
      musicDetailStore.setState('musicList',this.data.musicList)
      musicDetailStore.setState('musicListIndex',e.currentTarget.dataset.index)
      wx.navigateTo({
        url:`/packageMusicDetaild/pages/music-dtailed/index?id=${e.currentTarget.dataset.id}`     
       })
    }
  },

  
})
