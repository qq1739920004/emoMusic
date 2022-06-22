// components/searchMusic/index.ts
import {musicStore} from '../../store/index'
import {debounce} from '../../utils/debounce'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    disabled:{
      type:Boolean,
      value:false
    },
    serchValue:{
      type:String
    },
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
  // 搜索框处理
  serchValueChange(e:any){
    this.setData({
      serchValue:e.detail
    })
    if(!this.properties.serchValue){
      this.triggerEvent('musicListNull')
    }
    debounce(()=>{
      musicStore.dispatch('getSearchSuggest',this.properties.serchValue)
    })
  }

  },
  
  
})
