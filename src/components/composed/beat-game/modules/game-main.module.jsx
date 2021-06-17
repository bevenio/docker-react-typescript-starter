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

  renderVisuals = () => {
    console.log(this.getCurrentTrackPosition())
  }

  loop = () => {
    if (this.isGameActive) {
      if (this.state.status === 'play') {
        this.renderVisuals()
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

  end() {
    this.isGameActive = false
  }
}

export default Game
