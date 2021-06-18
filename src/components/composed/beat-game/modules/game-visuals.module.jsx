import Hitable from './game-hittable'

const CONSTANTS = {
  RANGE: 1500,
  POSITION_OFFSET: 150,
  STYLES: {
    COLOR_A: 'red',
    COLOR_B: 'blue',
    LINE_1: 3,
    LINE_2: 7,
  },
}

class GameVisuals extends Hitable {
  renderMock = ({ /* duration , */ track, position, canvas, context }) => {
    const minMarker = position - CONSTANTS.POSITION_OFFSET
    const maxMarker = position - CONSTANTS.POSITION_OFFSET + CONSTANTS.RANGE
    const percentPositionMarker = (position - minMarker) / (maxMarker - minMarker)

    const markerPixelX = percentPositionMarker * canvas.width
    const markerPixelY = canvas.height

    context.beginPath()
    context.lineWidth = 5
    context.strokeStyle = '#000000'
    context.moveTo(markerPixelX, 0)
    context.lineTo(markerPixelX, markerPixelY)
    context.stroke()

    track
      .filter((drum) => {
        const isInFuture = drum.time > position + CONSTANTS.RANGE - CONSTANTS.POSITION_OFFSET
        const isInPast = drum.time < position - CONSTANTS.POSITION_OFFSET
        return !isInFuture && !isInPast
      })
      .forEach((drum) => {
        const percentMarker = (drum.time - minMarker) / (maxMarker - minMarker)
        const pixelX = canvas.width * percentMarker
        const pixelY = canvas.height / 2
        const { STYLES } = CONSTANTS

        context.beginPath()
        context.arc(pixelX, pixelY, 20, 0, 2 * Math.PI, false)
        context.fillStyle = drum.action[0] === 'a' ? STYLES.COLOR_A : STYLES.COLOR_B
        context.fill()
        context.lineWidth = drum.action[1] === '1' ? STYLES.LINE_1 : STYLES.LINE_2
        context.strokeStyle = '#FFFFFF'
        context.stroke()
      })
  }

  render({ track, duration, position, canvas, context }) {
    context.clearRect(0, 0, canvas.width, canvas.height)
    this.renderMock({ track, duration, position, canvas, context })
  }
}

export default GameVisuals
