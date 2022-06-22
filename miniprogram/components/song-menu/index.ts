// components/song-menu/index.ts
import {musicStore} from '../../store/index'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    songMenu:{
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
    skipSongList(e:any){
      const id=e.currentTarget.dataset.id
      musicStore.dispatch('getMenuAllMusic',id)
      this.triggerEvent('skipSongList','热门歌单')
    }
  }
})
