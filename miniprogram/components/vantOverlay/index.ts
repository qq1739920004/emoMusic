// components/vantOverlay/index.ts
import {getVerifyService,getPhoenService,getRegisterVerifyService,passwordService,loginState} from '../../service/loginService'
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show:{
      type:Boolean,
      value:false
    },
    title:{
      type:String,
      value:'标题'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    phone: '',
    phoneIcon: '/assets/image/phoen.png',
    phoneError: '',
    sms: '',

    verifyText: '发送验证码',
    verifyIcon: '/assets/image/verify.png',
    verifyImport: true,

    loginMethod:true,//true为密码登录，false为验证码登录
    changeText:'使用验证码登录',
    password:'',

    isLoading:false//加载loading是否显示

  },

  /**
   * 组件的方法列表
   */
  methods: {
    //登录获取token保存
    //method：判断是验证码登录还是密码登录，true:密码登录，false:验证码登录
    async tokenSave(method:boolean) {
      let res:any
      if(method){
      res=await passwordService(this.data.phone,this.data.password)
      }
      else{
        res= await getRegisterVerifyService(this.data.phone,this.data.sms)
        if(!res.data){
          Notify({ type: 'danger', message: '验证码不正确' });
          this.setData({isLoading:false})      
          return false
        }
        this.setData({isLoading:false})
      }
      
      if(res.token || res.data){
        //密码登录才保存token
        if(res.token){
        wx.setStorage({
          key:"token",
          data:res.cookie
        })
      }
        this.setData({isLoading:false})
        //调用父组件的跳转页面
        this.triggerEvent('enterMusicHome')
      }else{
        Notify({ type: 'danger', message: res.msg ,top:100});
        this.setData({isLoading:false})
        return false
      }
      return true
  },
    //切换密码或验证码登录
    loginChange(){
      this.setData({loginMethod:!this.data.loginMethod})
      if(this.data.loginMethod){
        this.setData({changeText:'使用验证码登录'})
      }
      else{
        this.setData({changeText:'使用密码登录'})
      }

    },
    //遮罩层消失
    isShow(){
      this.setData({
        show: false
      })
    },
    //登录或者注册
   async signIn(){
     //登录是否成功
    let signState=true
     //验证码登录
      //验证是否输入框都是否正确
      if(!(await this.verifyRegister(false))){
        Notify({ type: 'danger', message: '请输入完整'});
        return
      }
      this.setData({isLoading:true})
    if(!this.data.loginMethod){
     //登录获取token保存
     signState=await (this.tokenSave(false))
    }
    //密码登录
    else{
      if(!this.data.password && this.data.loginMethod) {
        Notify({ type: 'danger', message: '请输入密码',top:100});
        this.setData({isLoading:false})
        return
      }
      //登录获取token保存
      signState=await (this.tokenSave(true))
    }
    
     //遮罩层消失
     if(signState){
      this.setData({isLoading:false})
      this.isShow
      Notify({ type: 'success', message: `${this.properties.title}成功` });
     }
    },
    //手机号焦点消失
    focusHidden() {
      let rep = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
      if (rep.test(this.data.phone)) {
        this.setData({ phoneIcon: '/assets/image/phoen1.png' })
        this.setData({ phoneError: '' })
        return
      }
      this.setData({ phoneError: '手机号格式错误' })
      this.setData({ phoneIcon: '/assets/image/phoen.png' })
    },
    //验证是否可以注册登录
    //method:判断是发送验证码的验证，还是注册登录的验证,true:发送验证码,false:注册登录
    async verifyRegister(method:boolean) {
      if(method){
        if (!this.data.verifyImport || Boolean(this.data.phoneError)) return false
      }
      else{
        if (Boolean(this.data.phoneError)) return false
      }
      if (!Boolean(this.data.phone)) return false
      //查看手机号是否已经注册
      //判断是注册还是登录的验证
      //注册
      if(this.properties.title=='注册'){
        this.setData({isLoading:true})
      let isPhone= await(await getPhoenService(this.data.phone)).hasPassword
      if(isPhone) {
        Notify({ type: 'danger', message: '此手机号已注册(有网易云账号可直接登录)' });
        this.setData({isLoading:false})
        return false
      }
    }
    //登录
    else{
      return true
    }
    return true
    },
    
    //点击获取验证码
  async getVerify() {
     //验证是否输入框都是否正确
    if(!(await this.verifyRegister(true))) return
    
      let verifyTime = 60
      this.setData({ verifyIcon: '/assets/image/verify1.png' })
      this.setData({ verifyText: verifyTime + 's' })
      this.setData({ verifyImport: false })
      //验证码请求
      getVerifyService(this.data.phone).then((res)=>{
        console.log(res)
      })
      //定时器改变内容
      const s1 = setInterval(() => {
        verifyTime -= 1
        this.setData({ verifyText: verifyTime + 's' })
        if (verifyTime == 0) {
          this.setData({ verifyImport: true })
          this.setData({ verifyText: '发送验证码' })
          this.setData({ verifyIcon: '/assets/image/verify.png' })
          clearInterval(s1)
        }
      }, 1000)
    },
   
  },

 
})
