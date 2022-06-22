import { getTopMV } from '../../service/videoService'
import {eventType} from './types'
// pages/home-music/index.ts
Page({
  /**
   * 页面的初始数据
   */
  data: {
    videoTitle: '' as any,
    hasMore:true,
    isLoading:true//加载loading是否显示
  },
  //跳转到视频页面
  routerChange(e:eventType){
     // 获取id
     const id = e.currentTarget.dataset.item.id
     // 页面跳转
     wx.navigateTo({
       url: `/pages/detail-video/index?id=${id}`,
     })
  },
  //封装网络函数
  async networkTopMvData(size:number){
    if(!this.data.hasMore) return
    wx.showNavigationBarLoading()
    let newData:any=this.data.videoTitle

    if(size==0){
      const res = await getTopMV(0)
      this.data.hasMore=res.hasMore
      this.setData({ videoTitle: res.data })
    }
    else{
      const res=await getTopMV(size)
      this.data.hasMore=res.hasMore
      newData=newData.concat(res.data)
      this.setData({videoTitle:newData})
    }
    this.setData({isLoading:false})
    wx.hideNavigationBarLoading()
    wx.stopPullDownRefresh()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function () {
    this.networkTopMvData(0)
  },
  //下拉刷新加载更多的生命周期回调函数
  onReachBottom: async function() {
    this.networkTopMvData(this.data.videoTitle.length)
  },
  //上拉刷新
  onPullDownRefresh:async function(){
    this.networkTopMvData(0)
  }


})