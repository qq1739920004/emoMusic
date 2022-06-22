// pages/detail-video/index.ts
import {getMVAddress,getMVRelation,getMVInfo} from '../../service/videoService'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mvInfop:[],
    MVRelation:[],
    MVAddress:[],
  },
 //请求视频信息
  mvService(id:string) {
    getMVInfo(id).then(res=>{
      this.setData({ mvInfop: res.data })
    }),
    getMVAddress(id).then(res=>{
      this.setData({ MVAddress: res.data })
    }),
    getMVRelation(id).then(res=>{
      this.setData({ MVRelation: res.data })

    })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(id:any) {
    this.mvService(id.id)
  },
 
  
})