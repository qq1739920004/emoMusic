// components/recommend/index.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    MVRelation:{
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
    videoChange(e:any){
      const id=e.currentTarget.dataset.id
      wx.navigateTo({
        url:`../../pages/detail-video/index?id=${id}`
      })
    }
  },
  created(){
  
  }
})
