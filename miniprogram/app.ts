// app.ts
import {myIAppOption} from './types'
App<myIAppOption>({
  onLaunch:function(){
    const _this=this
    wx.getSystemInfoAsync({
      success:function(res){
        _this.globalData.screenHeight=res.screenHeight,
        _this.globalData.screenWidth=res.screenWidth,
        _this.globalData.statusBarHeight=res.statusBarHeight
      }
    })
    
  },
  globalData: {
    screenHeight:0,
    screenWidth:0,
    statusBarHeight:0
  },
 
})