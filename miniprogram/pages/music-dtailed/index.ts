// pages/music-dtailed/index.ts
import {musicDetailStore} from '../../store/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    musicInfo:[] as any[],
    id:'',

    statusBarHeight:'',
    screenWidth:0,
    screenHeight:0,
    selectColor:true,
    isLoading:true,//加载loading是否显示
    isShowLyric:true,
  },
  //歌曲歌词转换
    swiperChange(){
      this.setData({selectColor:!this.data.selectColor})
    },
  //获取机型数据，获取歌曲信息数据
    getMusicInfo(id:any){
    this.setData({id:id.id})
    this.setData({statusBarHeight:getApp().globalData.statusBarHeight})
    this.setData({screenWidth:getApp().globalData.screenWidth})
    this.setData({screenHeight:getApp().globalData.screenHeight})
    this.setData({isShowLyric:(this.data.screenHeight/this.data.screenWidth)>2})
    //这里要用到info里面的背景图
    musicDetailStore.onState('musicInfo',(res:any)=>{
      if(Object.keys(res)) this.setData({musicInfo:res})
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(id:any) {
    console.log(id);
    
    this.getMusicInfo(id)
    this.setData({isLoading:false})

   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})