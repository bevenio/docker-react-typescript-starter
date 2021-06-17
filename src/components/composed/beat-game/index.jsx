import React from 'react'
import { connect } from 'react-redux'
// import { entries } from '@/store/store'

import './beat-game.scss'

export class BeatGame extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div className="app-beat-game-container">
        <h1>Game</h1>
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
