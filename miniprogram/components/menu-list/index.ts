// components/menu-list/index.ts
import {musicDetailStore} from '../../store/musicDetaile'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list:{
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
    skipDetaled(e:any){
      musicDetailStore.setState('musicList',this.data.list)
      musicDetailStore.setState('musicListIndex',e.currentTarget.dataset.index)
      wx.navigateTo({
        url:`../../pages/music-dtailed/index?id=${e.currentTarget.dataset.id}`     
       })
    }
  }
})
