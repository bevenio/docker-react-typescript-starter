interface NoiseParameters {
  canvas: HTMLCanvasElement | null
  color: string
}

interface NoiseState {
  color: string
  canvas: HTMLCanvasElement | null
  context: CanvasRenderingContext2D | null
  shadowCanvas: HTMLCanvasElement | null
  shadowContext: CanvasRenderingContext2D | null
  isNoiseActive: boolean
}

interface NoiseSettings {
  fps: number
  frequency: number
  division: number
  subfrequency: number
  subdivision: number
  alpha: number
  glitch: boolean
  glyphs: boolean
  variation: boolean
}

interface NoiseTime {
  interval: number
  then: number
  start: number
  now?: number
}

interface NoiseRenderingArea {
  leading: number
  width: number
  height: number
}

interface NoiseRenderingCoordinates {
  x: number
  y: number
  size: number
}

class Noise {
  /* Constants */
  CONSTANTS = {
    WEIRD_CHARACTERS: 'ŠŇƍƎƛϪϚɟϑƜƚɅơƩƵϡϟƿϴƾϞǮЄǾȐϖȞȵɃɎ',
  }

  /* Class states */
  state: NoiseState = {
    color: '',
    canvas: null,
    context: null,
    shadowCanvas: null,
    shadowContext: null,
    isNoiseActive: false,
  }

  noise: NoiseSettings = {
    fps: 15,
    frequency: 2,
    division: 30,
    subfrequency: 150,
    subdivision: 3,
    alpha: 0.9,
    glitch: false,
    glyphs: true,
    variation: true,
  }

  times: NoiseTime = {
    interval: 1000 / this.noise.fps,
    then: Date.now(),
    start: Date.now(),
  }

  /* Exposed methods */
  constructor({ canvas, color = '#FFFFFF' }: NoiseParameters) {
    const shadowCanvas = document.createElement('canvas')
    this.state = {
      ...this.state,
      color,
      canvas,
      context: canvas ? canvas.getContext('2d') : null,
      shadowCanvas,
      shadowContext: shadowCanvas.getContext('2d'),
    }
  }

  start(): void {
    if (this.state.canvas && !this.state.isNoiseActive) {
      this.state.isNoiseActive = true
      this.render()
    } else {
      throw new Error('A canvas element needs to be passed (noise start)')
    }
  }

  pause(): void {
    if (this.state.canvas && this.state.isNoiseActive) {
      this.state.isNoiseActive = false
    } else {
      throw new Error('A canvas element needs to be passed (noise pause)')
    }
  }

  /* Internal methods */

  resizeCanvas = (): void => {
    const { canvas, context, shadowCanvas, shadowContext } = this.state

    if (canvas && context && shadowCanvas && shadowContext) {
      context.clearRect(0, 0, canvas.width, canvas.height)
      shadowContext.clearRect(0, 0, shadowCanvas.width, shadowCanvas.height)
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      shadowCanvas.width = canvas.offsetWidth
      shadowCanvas.height = canvas.offsetHeight
    }
  }

  prepare = (): void => {
    const { canvas } = this.state

    if (canvas) {
      if (canvas.width !== canvas.offsetWidth || canvas.height !== canvas.offsetHeight) {
        this.resizeCanvas()
      }
    }
  }

  getRenderingArea = (): NoiseRenderingArea => {
    const { canvas } = this.state

    if (canvas) {
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
    return {
      leading: 0,
      width: 0,
      height: 0,
    }
  }

  getRandomPixel = (area: NoiseRenderingArea, division: number): NoiseRenderingCoordinates => ({
    x: area.leading * (Math.round(Math.random() * division) / division) + area.width,
    y: area.leading * (Math.round(Math.random() * division) / division) + area.height,
    size: area.leading / division,
  })

  renderEraseLayer = (): void => {
    const { canvas, context, shadowCanvas, shadowContext } = this.state

    if (canvas && context && shadowCanvas && shadowContext) {
      if (canvas.width > 0 && canvas.height > 0) {
        shadowContext.clearRect(0, 0, shadowCanvas.width, shadowCanvas.height)
        shadowContext.globalAlpha = this.noise.alpha
        shadowContext.drawImage(canvas, 0, 0)
        context.clearRect(0, 0, canvas.width, canvas.height)
        context.drawImage(shadowCanvas, 0, 0)
      }
    }
  }

  renderPixel = ({ x, y, size }: NoiseRenderingCoordinates): void => {
    const { context } = this.state

    if (context) {
      if (Math.random() > 0.5 || !this.noise.variation) {
        context.fillRect(x, y, size, size)
      } else {
        context.beginPath()
        context.rect(x, y, size, size)
        context.stroke()
      }
    }
  }

  renderDivisionPixelsLayer = (): void => {
    const { color, context } = this.state
    const area = this.getRenderingArea()

    if (context) {
      context.fillStyle = color
      context.strokeStyle = color
      context.lineWidth = 1

      for (let i = 0; i < this.noise.frequency; i += 1) {
        const pixel = this.getRandomPixel(area, this.noise.division)
        this.renderPixel(pixel)
      }
    }
  }

  renderSubdivisionPixelsLayer = (): void => {
    const { color, context } = this.state
    const area = this.getRenderingArea()

    if (context) {
      context.fillStyle = color
      context.strokeStyle = color
      context.lineWidth = 1

      for (let i = 0; i < this.noise.subfrequency; i += 1) {
        const pixel = this.getRandomPixel(area, this.noise.division)
        const subarea = { leading: pixel.size, width: pixel.x, height: pixel.y }
        const subPixel = this.getRandomPixel(subarea, this.noise.subdivision)
        this.renderPixel(subPixel)
      }
    }
  }

  renderGlyphs = (): void => {
    if (this.noise.glyphs && Math.random() > 0.5) {
      const { color, context } = this.state
      const area = this.getRenderingArea()

      if (context) {
        context.fillStyle = color
        context.strokeStyle = color
        context.lineWidth = 1

        for (let i = 0; i < this.noise.frequency; i += 1) {
          const pixel = this.getRandomPixel(area, this.noise.division)
          const subarea = { leading: pixel.size, width: pixel.x, height: pixel.y }
          const subPixel = this.getRandomPixel(subarea, this.noise.subdivision)
          const glyph = this.CONSTANTS.WEIRD_CHARACTERS.split('').sort(() => 0.5 - Math.random())[0]
          context.font = `${pixel.size}px Impact`
          context.fillText(glyph, subPixel.x, subPixel.y)
        }
      }
    }
  }

  renderGlitch = (): void => {
    if (this.noise.glitch && Math.random() > 0.5) {
      const { canvas, context } = this.state
      const area = this.getRenderingArea()

      if (canvas && context) {
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
  }

  render = (): void => {
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
      this.renderGlyphs()
      this.renderGlitch()
    }
  }
}

export { Noise }
