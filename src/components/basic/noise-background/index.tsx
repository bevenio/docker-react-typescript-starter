import { useEffect, useState, createRef } from 'react'

/* Styles */
import './noise-background.scss'

/* Modules */
import { Noise } from './noise-background.module'

interface Props {
  color: string
  children?: React.ReactNode
}

const NoiseBackground: React.FC<Props> = function ({ color, children }) {
  // Component state
  const [noise, setNoise] = useState<Noise | null>(null)
  const canvasRef = createRef<HTMLCanvasElement>()

  // Component effects
  const startNoise = (): void => {
    const noiseInstance = new Noise({
      canvas: canvasRef.current,
      color,
    })
    noiseInstance.start()
    setNoise(noiseInstance)
  }

  const endNoise = (): void => {
    if (noise) {
      noise.pause()
    }
  }

  useEffect(() => {
    startNoise()
    return endNoise
  }, [])

  // Component render
  return (
    <div className="app-noise-background-container">
      <canvas ref={canvasRef} className="app-noise-background-canvas" width="0" height="0" />
      <div className="app-noise-background-container-content">{children}</div>
    </div>
  )
}

export { NoiseBackground }
