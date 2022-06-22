// components/ranking-item/index.
import {musicStore} from '../../store/index'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    rankingTop3:{
      type:Object
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
      this.triggerEvent('skipSongList','巅峰榜')

    }
  },

})
