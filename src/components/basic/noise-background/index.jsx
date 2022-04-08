import React, { useEffect, useState } from 'react'

/* Styles */
import './noise-background.scss'

/* Modules */
import Noise from './noise-background.module'

const NoiseBackground = function ({ color, children }) {
  // Component state
  const [noise, setNoise] = useState(null)
  const canvasRef = React.createRef()

  // Component effects
  const startNoise = () => {
    const noiseInstance = new Noise({
      canvas: canvasRef.current,
      color: color,
    })
    noiseInstance.start()
    console.log(noiseInstance)
    setNoise(noiseInstance)
  }

  const endNoise = () => {
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

export default NoiseBackground
