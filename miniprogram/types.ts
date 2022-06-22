

interface myIAppOption {
    globalData: {
      screenHeight:number,
      screenWidth:number,
      statusBarHeight:number
      userInfo?: WechatMiniprogram.UserInfo,
    }
    userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}
export {myIAppOption}