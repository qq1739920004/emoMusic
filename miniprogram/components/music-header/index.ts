// components/music-header/index.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    statusBarHeight:{
      type:Number
    },
    screenHeight:{
      type:Number
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
  },
lifetimes:{
 
},
  /**
   * 组件的方法列表
   */
  methods: {
    back(){
      wx.navigateBack({
        delta: 1
      })
    }
  }
})
