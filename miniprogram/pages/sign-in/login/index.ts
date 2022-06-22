// pages/login/index.ts
import Notify from '../../../miniprogram_npm/@vant/weapp/notify/notify';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showRegister:false,
    showLogin:false
  },
  enterHome(){
    wx.switchTab({
      url: `/pages/home-music/index`,
    })
  },
  //是否显示注册
  onClickShowRegister() {
    this.setData({ showRegister: true });
  },
  //是否显示登陆
  onClickShowLogin() {
    this.setData({ showLogin: true });
  },

  onClickHide() {
    // this.setData({ show: false });
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    let pageThis=this
    wx.getStorage({
      key:'token',
      success(){
    //如果token存在直接跳转页面
        pageThis.enterHome()
      },
      fail(){
      }
    })
    
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