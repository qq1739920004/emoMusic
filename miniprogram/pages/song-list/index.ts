// pages/song-list/index.ts
import {musicStore} from "../../store/index"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:'',
    list:[] as any[],
    listDetail:Object as any,
    isLoading:true,//加载loading是否显示
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(data) {

    this.setData({type:data.type})
    if(data.type==='musicList'){
      musicStore.onState('hotMusic',(value:any)=>{
        this.setData({list:value})
      })
    }
    else{
      musicStore.onState('AllMusic',(value:any)=>{
        if(!value.songs) return
        this.setData({list:value.songs})
        this.setData({isLoading:false})

      })
      musicStore.onState('detail',(value:any)=>{
        if(!value.playlist) return
        this.setData({listDetail:value.playlist})
      })
    }
    
    
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
    this.setData({list:[]})
    this.setData({listDetail:{}})
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