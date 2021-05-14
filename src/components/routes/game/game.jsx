/* SCSS */
import './game.scss'

/* MODULE IMPORTS */
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

/* REDUX IMPORTS */
import { store } from '@/store/redux-store'

/* COMPONENT IMPORTS */
import Chat from '@/components/stateful/chat/chat'

export class GameRoute extends React.Component {
  constructor() {
    super()
    this.state = {
      unsubscribe: null,
    }
  }

  componentDidMount() {
    this.conditionallyRedirectToStart()
    this.setState({
      unsubscribe: store.subscribe(
        this.conditionallyRedirectToStart.bind(this)
      ),
    })
  }

  componentWillUnmount() {
    const { unsubscribe } = this.state
    if (unsubscribe) {
      unsubscribe()
    }
  }

  conditionallyRedirectToStart() {
    if (store.getState().game.currentGame.status === 'NONE') {
      const { history } = this.props
      if (history) {
        history.push('/start')
      }
    }
  }

  render() {
    return (
      <div className="app-route-game">
        <Chat />
      </div>
    )
  }
}

/* REDUX CONNECTION */
const mapStateToProps = (/* state */) => ({
  reduxState: {},
})
const mapDispatchToProps = (/* dispatch */) => ({
  reduxActions: {},
})

export const ConnectedGameRoute = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameRoute)

export default withRouter(ConnectedGameRoute)
