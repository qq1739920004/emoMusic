// pages/home-music/index.ts
import {swiperService,hotSongMenu,handpickMenu,rankingMenu} from '../../service/musicService'
import {musicStore} from '../../store/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    serchValue:'',
    banners:[],
    isImgLoad:false,
    isLoading:true,//加载loading是否显示
    musicList:[] as any[],
    songMenu:[] as any[],//热门歌单数据
    songMenu2:[] as any[],//精选歌单数据
    // 三个榜单榜单的前3个数据 rankingTop3[0]:飙升榜  rankingTop3[1]:新歌榜  rankingTop3[2]:热歌榜  
    rankingTop3:[] as any[],
  },

  
  //跳转到音乐列表
  skipSongList(title:any){
    if(title.detail==='推荐歌曲'){
      wx.navigateTo({
        url:`../song-list/index?type=${'musicList'}`
      })
    }
    else if(title.detail==='热门歌单' || title.detail==='精选歌单'){
      wx.navigateTo({
        url:`../song-list/index?type=${'menu'}`
      })
    } 
    else if(title.detail==='巅峰榜'){
      wx.navigateTo({
        url:`../song-list/index?type=${'rankingList'}`
      })
    }
  }, 
  //请求轮播图数据
  hanldSwiper(){
    swiperService().then(res=>{
    this.setData({banners:res.banners})
    })
  },
  //请求热门歌单数据
  networkHotSongMenu(){
    hotSongMenu().then(res=>{
      this.setData({songMenu:res.playlists})
      
    })
   
    
  },
  //请求精选歌单数据
  networkHandpickMenu(){
    handpickMenu().then(res=>{
      this.setData({songMenu2:res.playlists})
    })
    
  },
  //请求所有榜单前三首数据数据
  networkRanking(){
    rankingMenu().then(res=>{
      this.setData({rankingTop3:[...res.list.slice(0,2),...res.list.slice(3,4)]})
        wx.nextTick(() => {
          // 在当前同步流程结束后，下一个时间片执行
          this.setData({
            isLoading: false
          }) 
        })
    
      // 不要原创榜      
    })
  },
  //跳转到搜索界面
  hanldSearch() {
    wx.navigateTo({
      url:"../music-serch/index"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    if(!wx.getStorageSync('token')){
      wx.navigateTo({
        url:'../sign-in/login/index'
      })
    }
    else{
    this.hanldSwiper()
    // 调用状态管理
      musicStore.dispatch("getHotMusicList")
      musicStore.onState('hotMusic',(res:any)=>{
        if(res){
          this.setData({musicList:res})
        }
      }),
      this.networkHotSongMenu()
      this.networkHandpickMenu()
      this.networkRanking()

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