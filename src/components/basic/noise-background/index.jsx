import React from 'react'

/* Styles */
import './noise-background.scss'

/* Modules */
import Noise from './noise-background.module'

class NoiseBackground extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      canvasReference: React.createRef(),
    }
  }

  componentDidMount() {
    const { canvasReference } = this.state

    const noise = new Noise({
      canvas: canvasReference.current,
      color: this.props.color,
    })

    noise.start()

    this.setState({
      noise,
    })
  }

  componentWillUnmount() {
    if (this.state.noise) {
      this.state.noise.pause()
    }
  }

  render() {
    const { children } = this.props

    return (
      <div className="app-noise-background-container">
        <canvas
          ref={this.state.canvasReference}
          className="app-noise-background-canvas"
          width="0"
          height="0"
        />
        <div className="app-noise-background-container-content">{children}</div>
      </div>
    )
  }
}

export default NoiseBackground
