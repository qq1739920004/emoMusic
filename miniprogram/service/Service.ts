import {methodTypes} from './types'

const BASE_URL="https://netease-cloud-music-api-five-tan.vercel.app/"

class Lrequest{
  requestInstance:any
  request(url:string,method:methodTypes,params?:any){
    return new Promise<any>((resolve,reject)=>{
        this.requestInstance= wx.request({
        url:BASE_URL+url,
        method:method,
        data:params,
        success:(res)=>{
          resolve(res.data)
        },
        fail:reject //同下面写法一样
        // (err)=>{
        //   reject(err)
        // }
      })
    })
  }
  get(url:string,params?:any){
   return this.request(url,'GET',params)
  }
  post(url:string,params?:any){
    return this.request(url,'POST',params)
  }
  abort(){
    console.log('hihihi');
    if(this.requestInstance){
    return this.requestInstance.abort()
    }
  }
}
const LRequest=new Lrequest
export {LRequest}