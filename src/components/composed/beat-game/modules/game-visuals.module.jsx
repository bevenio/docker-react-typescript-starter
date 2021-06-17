class GameVisuals {
  render({ /* , , track */ duration, position, canvas, context }) {
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.font = '30px Arial'
    context.fillText(`${(position / duration) * 100}%`, 50, 50)
  }
}

export default GameVisuals
