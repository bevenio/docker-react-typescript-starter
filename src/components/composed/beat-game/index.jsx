import React from 'react'
import { connect } from 'react-redux'

/* Styles */
import './beat-game.scss'

/* Modules */
import Game from './modules/game-main.module'

export class BeatGame extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      canvasReference: React.createRef(),
    }
  }

  componentDidMount() {
    const { canvasReference } = this.state
    this.setState({
      game: new Game({
        track: this.props.track || [],
        canvas: canvasReference.current,
      }),
    })
    this.resizeCanvas()
    this.addListeners()
  }

  componentDidUpdate() {
    if (this.state.game) {
      if (this.props.position) {
        this.state.game.trackPosition = this.props.position
        this.state.game.trackUpdateTime = new Date().getTime()
      }
      if (this.props.duration) {
        this.state.game.trackDuration = this.props.duration
      }
      if (this.props.status) {
        this.state.game.trackStatus = this.props.status
      }
    }
  }

  componentWillUnmount() {
    if (this.state.game) {
      this.state.game.pause()
    }
  }

  resizeCanvas = () => {
    if (this.state.canvasReference.current) {
      const canvas = this.state.canvasReference.current
      canvas.width = canvas.scrollWidth
      canvas.height = canvas.scrollHeight
    }
  }

  addListeners = () => {
    window.addEventListener('resize', this.resizeCanvas)
  }

  render() {
    return (
      <div className="app-beat-game-container">
        <canvas className="app-beat-game-canvas" ref={this.state.canvasReference} />
      </div>
    )
  }
}

/* Redux Connection */
const mapStateToProps = (/* state */) => ({
  reduxState: {},
})

const mapDispatchToProps = (/* dispatch */) => ({
  reduxActions: {},
})
export default connect(mapStateToProps, mapDispatchToProps)(BeatGame)
