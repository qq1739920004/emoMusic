export interface eventType {
  changedTouches: [{
    clientX: number,
    clientY: number,
    force: number,
    identifier: number,
    pageX: number,
    pageY: number
  }],
  currentTarget: {
    dataset: AnyObject,
    id: string,
    offsetLeft: number,
    offsetTop: number
  },
  detail: {
    x: number,
    y: number
  },
  mark: AnyObject,
  mut: boolean,
  target: {
    dataset: AnyObject,
    id: string,
    offsetLeft: number,
    offsetTop: number
  },
  timeStamp: number,
  touches: [{
    clientX: number,
    clientY: number,
    force: number,
    identifier: number,
    pageX: number,
    pageY: number
  }],
  type: string,
  _userTap: boolean
}
