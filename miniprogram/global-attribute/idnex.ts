const audio=wx.createInnerAudioContext()
import {musicDetailStore} from '../store/musicDetaile'
audio.onEnded(()=>{
  musicDetailStore.dispatch('nextMusuc')
})
export {audio}