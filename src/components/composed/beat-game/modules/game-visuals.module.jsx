import { ACTIONS } from './game-constants'
import Hitable from './game-hittable'

const CONSTANTS = {
  RANGE: 1500,
  POSITION_OFFSET: 150,
  STYLES: {
    COLOR_A: 'red',
    COLOR_B: 'blue',
    COLOR_MARKER: '#000000',
    COLOR_BORDER: '#ffffff',
    COLOR_READY: '#f8e800',
    SIZE_1: 25,
    SIZE_2: 30,
    LINE_1: 3,
    LINE_2: 7,
    DRUMROLL_SIZE: 60,
  },
}

class GameVisuals extends Hitable {
  score = 0
  combo = 0
  hitType = null

  renderMock = ({ /* duration , */ track, position, canvas, context }) => {
    const { STYLES } = CONSTANTS

    const minMarker = position - CONSTANTS.POSITION_OFFSET
    const maxMarker = position - CONSTANTS.POSITION_OFFSET + CONSTANTS.RANGE
    const percentPositionMarker = (position - minMarker) / (maxMarker - minMarker)

    const markerPixelX = percentPositionMarker * canvas.width

    const drumRollCenterPixelY = canvas.height / 2
    const drumRollWidth = canvas.width

    context.lineWidth = 5
    context.strokeStyle = STYLES.COLOR_MARKER

    context.fillStyle = '#000000'
    context.font = '20px Arial'
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.fillText(`Score: ${this.score} Combo: ${this.combo}`, canvas.width / 2, 40)

    context.beginPath()
    context.moveTo(0, drumRollCenterPixelY - STYLES.DRUMROLL_SIZE)
    context.lineTo(drumRollWidth, drumRollCenterPixelY - STYLES.DRUMROLL_SIZE)
    context.stroke()

    context.beginPath()
    context.moveTo(0, drumRollCenterPixelY + STYLES.DRUMROLL_SIZE)
    context.lineTo(drumRollWidth, drumRollCenterPixelY + STYLES.DRUMROLL_SIZE)
    context.stroke()

    context.beginPath()
    context.moveTo(markerPixelX, drumRollCenterPixelY - STYLES.DRUMROLL_SIZE)
    context.lineTo(markerPixelX, drumRollCenterPixelY + STYLES.DRUMROLL_SIZE)
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

        const isHittingMarker = Math.abs(drum.time - position) < STYLES.SIZE_1

        const fillStyle = drum.action[0] === 'a' ? STYLES.COLOR_A : STYLES.COLOR_B
        const lineWidth = drum.action[1] === '1' ? STYLES.LINE_1 : STYLES.LINE_2
        const radius = drum.action[1] === '1' ? STYLES.SIZE_1 : STYLES.SIZE_2
        const strokeStyle = isHittingMarker ? STYLES.COLOR_READY : STYLES.COLOR_BORDER

        context.beginPath()
        context.arc(pixelX, pixelY, radius, 0, 2 * Math.PI, false)
        context.fillStyle = fillStyle
        context.lineWidth = lineWidth
        context.strokeStyle = strokeStyle
        context.fill()
        context.stroke()

        context.font = `20px Arial`
        context.fillStyle = '#ffffff'
        let character
        switch (drum.action) {
          case ACTIONS.A1: {
            character = '⬅'
            break
          }
          case ACTIONS.A2: {
            character = '⬆'
            break
          }
          case ACTIONS.B1: {
            character = '➡'
            break
          }
          case ACTIONS.B2: {
            character = '⬇'
            break
          }
          default:
            break
        }

        context.fillText(character, pixelX, pixelY)
      })
  }

  render({ track, duration, position, canvas, context }) {
    context.clearRect(0, 0, canvas.width, canvas.height)
    this.renderMock({ track, duration, position, canvas, context })
  }

  updateScore({ score, combo, hitType }) {
    this.score = score
    this.combo = combo
    this.hitType = hitType
  }
}

export default GameVisuals
