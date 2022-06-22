// components/musicBread/index.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:{
      type:String,
      value:'推荐歌曲'
    },
    text:{
      type:String,
      value:'更多'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showText:true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    skipSongList(){
      this.triggerEvent('skipSongList',this.properties.title)
    }
  }
})
