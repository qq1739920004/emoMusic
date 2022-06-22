import {LRequest} from './Service'
//查看手机是否已经注册
export function getPhoenService(phone:string) {
  return LRequest.get("/cellphone/existence/check",{
     phone
   })
 }
//注册请求验证码
export function getVerifyService(phone:string) {
 return LRequest.get("/captcha/sent",{
    phone
  })
}
//验证验证码是否正确(验证码登录)
export function getRegisterVerifyService(phone:string,captcha:string) {
  return LRequest.get("/captcha/verify",{
     phone,
     captcha
   })
 }
 //密码登录
 export function passwordService(phone:string,password:string) {
  return LRequest.post("/login/cellphone",{
    phone,
    password
  })
 }
//登录状态
export function loginState() {
  return LRequest.get("/login/status")
 }