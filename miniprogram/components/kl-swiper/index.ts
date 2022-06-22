// components/kl-swiper/index.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isLoading:{
      type:Boolean
    },
    banners:{
      type:Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isImgLoad:false,
    bannersHeight:0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
  //获取轮播图宽度,以此来适应不同设备下小圆点保持在轮播图底部
  handleImageWidth(){
    
    if (this.data.isImgLoad) return

    this.setData({isImgLoad:true})
    setTimeout(()=>{
    this.setData({isImgLoad:false})
      },100)
    const query = this.createSelectorQuery()
    query.select('.item-image').boundingClientRect()
    query.exec((res)=>{
      const rect = res[0]
      this.setData({bannersHeight:rect.height})
    })
    
  },
  }
})
