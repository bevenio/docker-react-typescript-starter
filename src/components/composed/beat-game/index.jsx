import React from 'react'
import { connect } from 'react-redux'
// import { entries } from '@/store/store'

import Game from './modules/game-main.module'

import './beat-game.scss'

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
  }

  componentDidUpdate() {
    if (this.state.game && this.props.position) {
      this.state.game.trackPosition = this.props.position
    }
    if (this.state.game && this.props.duration) {
      this.state.game.trackDuration = this.props.duration
    }
    if (this.state.game && this.props.status) {
      this.state.game.trackStatus = this.props.status
    }
  }

  componentWillUnmount() {
    if (this.state.game) {
      this.state.game.end()
    }
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
