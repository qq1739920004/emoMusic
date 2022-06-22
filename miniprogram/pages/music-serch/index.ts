// pages/music-serch/index.ts
import {hotSearchService} from '../../service/searchService'
import {musicStore} from '../../store/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    serchValue:'',
    serchSuggest:[],
    hotSearchList:[],
    musicList:[] as any,
    paramsInfo:{} as any
  },
  //确认开始搜索
  serchStart(){
    wx.nextTick(()=>{
      this.setData({paramsInfo:{
        keyword:this.data.serchValue,
        limit:30,
        offset:0
      }})
      musicStore.dispatch('getSearchEnter',this.data.paramsInfo)
      musicStore.onState('SearchEntetList',(res:any)=>{
        this.setData({musicList:res})
      })
    })
  },
  musicListNull(){
    this.setData({musicList:[]})
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    hotSearchService().then((res)=>{
      this.setData({hotSearchList:res.result.hots})
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
    wx.nextTick(()=>{
      this.setData({paramsInfo:{
        keyword:this.data.serchValue,
        limit:this.data.paramsInfo.limit,
        offset:this.data.paramsInfo.offset+1
      }})
      musicStore.dispatch('getSearchEnter',this.data.paramsInfo)
      musicStore.onState('SearchEntetList',(res:any)=>{
        
        this.setData({musicList:[...this.data.musicList,...res]})
      })
      
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})