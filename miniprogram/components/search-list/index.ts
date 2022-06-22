// components/search-list/index.ts
import {musicStore} from '../../store/index'
import {colorText} from '../../utils/colorText'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    serchValue:{
      type:String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    list:[] as any[],
    sliceText:[] as any
  },

  /**
   * 组件的方法列表
   */
  methods: {
    serchValueChange(e:any){
      this.triggerEvent('serchStart')
      
      this.setData({
        serchValue:this.data.list[e.currentTarget.dataset.index].keyword
      })
    }
  },
  created:function() {
    musicStore.onState('SearchSuggest',(res:any)=>{
      if(res){
        const purifyRes=res.map((item:any)=>item.keyword)
        this.setData({list:res})
        //把字符串拆分成搜索框字体着色
        const nodesAll= colorText(purifyRes,this.properties.serchValue)
        this.setData({sliceText:nodesAll})
      }
    })
  }
})
