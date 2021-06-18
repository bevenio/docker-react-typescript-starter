import { ACTIONS } from './game-constants'
import Hitable from './game-hittable'

class GameKeyboard extends Hitable {
  constructor() {
    super()
    this.addListeners()
  }

  addListeners() {
    window.addEventListener('keydown', (event) => {
      switch (event.code) {
        case 'ArrowLeft':
          this.hit(ACTIONS.A1)
          break
        case 'ArrowUp':
          this.hit(ACTIONS.A2)
          break
        case 'ArrowRight':
          this.hit(ACTIONS.B1)
          break
        case 'ArrowDown':
          this.hit(ACTIONS.B2)
          break
        default:
          break
      }
    })
  }
}

export default GameKeyboard
