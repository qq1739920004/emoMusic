// components/hot-search/index.
import {musicStore} from '../../store/index'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    serchValue:{
      type:String  
    },
    hotSearchList:{
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
    getHotFirst(e:any){
      this.triggerEvent('serchStart')
      this.setData({
        serchValue:e.currentTarget.dataset.first
      })
      musicStore.dispatch('getSearchSuggest',this.properties.serchValue)
    }
  },

 
})

