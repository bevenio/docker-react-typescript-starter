import { ACTIONS } from './game-constants'

class Hitable {
  hitCallback = []

  hit(action) {
    if (typeof action === 'string' && !!ACTIONS[action.toUpperCase()]) {
      this.hitCallback.forEach((callback) => {
        callback(action)
      })
    }
  }

  onHit(callback) {
    if (callback && typeof callback === 'function') {
      this.hitCallback.push(callback)
    }
  }
}

export default Hitable
