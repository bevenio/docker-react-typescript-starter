class Noise {
  /* Class states */
  state = {
    color: null,
    canvas: null,
    context: null,
    shadowCanvas: null,
    shadowContext: null,
    isNoiseActive: false,
  }

  noise = {
    fps: 15,
    frequency: 2,
    division: 30,
    subfrequency: 150,
    subdivision: 3,
    alpha: 0.9,
    glitch: true,
    variation: true,
  }

  times = {
    interval: 1000 / this.noise.fps,
    then: Date.now(),
    start: Date.now(),
  }

  /* Exposed methods */
  constructor({ canvas, color = '#FFFFFF' }) {
    const shadowCanvas = document.createElement('canvas')
    this.state = {
      ...this.state,
      color,
      canvas,
      context: canvas.getContext('2d'),
      shadowCanvas,
      shadowContext: shadowCanvas.getContext('2d'),
    }
  }

  start() {
    if (this.state.canvas && !this.state.isNoiseActive) {
      this.state.isNoiseActive = true
      this.render()
    } else {
      throw new Error('A canvas element needs to be passed  (noise start)')
    }
  }

  pause() {
    if (this.state.canvas && this.state.isNoiseActive) {
      this.state.isNoiseActive = false
    } else {
      throw new Error('A canvas element needs to be passed (noise pause)')
    }
  }

  /* Internal methods */

  resizeCanvas = () => {
    const { canvas, context, shadowCanvas, shadowContext } = this.state

    context.clearRect(0, 0, canvas.width, canvas.height)
    shadowContext.clearRect(0, 0, shadowCanvas.width, shadowCanvas.height)
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    shadowCanvas.width = canvas.offsetWidth
    shadowCanvas.height = canvas.offsetHeight
  }

  prepare = () => {
    const { canvas } = this.state

    if (canvas.width !== canvas.offsetWidth || canvas.height !== canvas.offsetHeight) {
      this.resizeCanvas()
    }
  }

  getRenderingArea = () => {
    const { canvas } = this.state
    const difference = Math.abs(canvas.width - canvas.height)

    if (canvas.width > canvas.height) {
      return {
        leading: canvas.width,
        width: 0,
        height: 0 - difference / 2,
      }
    }
    return {
      leading: canvas.height,
      width: 0 - difference / 2,
      height: 0,
    }
  }

  getRandomPixel = (area, division) => ({
    x: area.leading * (Math.round(Math.random() * division) / division) + area.width,
    y: area.leading * (Math.round(Math.random() * division) / division) + area.height,
    size: area.leading / division,
  })

  renderEraseLayer = () => {
    const { canvas, context, shadowCanvas, shadowContext } = this.state

    shadowContext.clearRect(0, 0, shadowCanvas.width, shadowCanvas.height)
    shadowContext.globalAlpha = this.noise.alpha
    shadowContext.drawImage(canvas, 0, 0)
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.drawImage(shadowCanvas, 0, 0)
  }

  renderPixel = ({ x, y, size }) => {
    const { context } = this.state

    if (Math.random() > 0.5 || !this.noise.variation) {
      context.fillRect(x, y, size, size)
    } else {
      context.beginPath()
      context.rect(x, y, size, size)
      context.stroke()
    }
  }

  renderDivisionPixelsLayer = () => {
    const { color, context } = this.state
    const area = this.getRenderingArea()

    context.fillStyle = color
    context.strokeStyle = color
    context.lineWidth = 1

    for (let i = 0; i < this.noise.frequency; i += 1) {
      const pixel = this.getRandomPixel(area, this.noise.division)
      this.renderPixel(pixel)
    }
  }

  renderSubdivisionPixelsLayer = () => {
    const { color, context } = this.state
    const area = this.getRenderingArea()

    context.fillStyle = color
    context.strokeStyle = color
    context.lineWidth = 1

    context.fillStyle = color
    for (let i = 0; i < this.noise.subfrequency; i += 1) {
      const pixel = this.getRandomPixel(area, this.noise.division)
      const subarea = { leading: pixel.size, width: pixel.x, height: pixel.y }
      const subPixel = this.getRandomPixel(subarea, this.noise.subdivision)
      this.renderPixel(subPixel)
    }
  }

  renderGlitch = () => {
    const { canvas, context } = this.state
    const area = this.getRenderingArea()

    if (this.noise.glitch && Math.random() > 0.5) {
      context.drawImage(
        canvas,
        Math.random() * area.leading,
        Math.random() * area.leading,
        Math.random() * area.leading,
        Math.random() * area.leading,
        Math.random() * area.leading,
        Math.random() * area.leading,
        Math.random() * area.leading,
        Math.random() * area.leading
      )
    }
  }

  render = () => {
    if (this.state.isNoiseActive) {
      window.requestAnimationFrame(this.render)
    }

    this.times.now = Date.now()
    const elapsed = this.times.now - this.times.then

    if (elapsed > this.times.interval) {
      this.times.then = this.times.now - (elapsed % this.times.interval)
      this.prepare()
      this.renderEraseLayer()
      this.renderDivisionPixelsLayer()
      this.renderSubdivisionPixelsLayer()
    }
  }
}

export default Noise
