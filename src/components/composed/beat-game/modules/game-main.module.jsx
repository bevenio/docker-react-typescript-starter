import GameVisuals from './game-visuals.module'
import GameKeyboardInuts from './game-keyboard-input.module'

class Game {
  /* Private properties */
  isGameActive = false
  canvas = null
  context = null

  state = {
    track: [],
    status: 'paused',
    positionInMilliseconds: 0,
    durationInMilliseconds: 0,
    lastUpdateTimeInMilliseconds: new Date().getTime(),
  }

  Visuals = new GameVisuals()
  KeyboardInputs = new GameKeyboardInuts()

  /* Class implementation */
  constructor({ canvas, track }) {
    if (canvas instanceof HTMLElement && canvas.tagName === 'CANVAS') {
      this.canvas = canvas
      this.context = canvas.getContext('2d')
      this.state.track = track || []
      this.isGameActive = true
      this.loop()
    } else {
      throw new Error('Cannot initialize without valid canvas element')
    }
  }

  getCurrentTrackPosition = () => {
    const timeDifferenceInMilliseconds =
      new Date().getTime() - this.state.lastUpdateTimeInMilliseconds
    return this.state.positionInMilliseconds + timeDifferenceInMilliseconds
  }

  render = () => {
    this.Visuals.render({
      canvas: this.canvas,
      context: this.context,
      track: this.track,
      duration: this.state.durationInMilliseconds,
      position: this.getCurrentTrackPosition(),
    })
  }

  loop = () => {
    if (this.isGameActive) {
      if (this.state.status === 'play') {
        this.render()
      }
      window.requestAnimationFrame(this.loop)
    }
  }

  /* Public functions */
  set trackPosition(positionInMilliseconds) {
    this.state.positionInMilliseconds = positionInMilliseconds
  }

  set trackDuration(durationInMilliseconds) {
    this.state.durationInMilliseconds = durationInMilliseconds
  }

  set trackStatus(status) {
    this.state.status = status || 'paused'
  }

  set trackUpdateTime(timeInMilliseconds) {
    this.state.lastUpdateTimeInMilliseconds = timeInMilliseconds
  }

  continue() {
    this.isGameActive = true
  }

  pause() {
    this.isGameActive = false
  }
}

export default Game
