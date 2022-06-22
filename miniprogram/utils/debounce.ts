
let timeRun:any

export function debounce(Fn:Function) {
  if(timeRun){
    clearTimeout(timeRun)
  }
  db()
  function db() {
    timeRun=setTimeout(()=>{
      Fn()
    },200)
  }

}