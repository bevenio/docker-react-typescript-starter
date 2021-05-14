/* SCSS */
import './start.scss'

/* MODULE IMPORTS */
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

/* REDUX IMPORTS */
import { entries, store } from '@/store/redux-store'

/* COMPONENT IMPORTS */
import EmojiCard from '@/components/stateless/emoji-card/emoji-card'

export class StartRoute extends React.Component {
  constructor() {
    super()
    this.state = {
      unsubscribe: null,
    }
  }

  componentDidMount() {
    this.conditionallyRedirectToGame()
    this.setState({
      unsubscribe: store.subscribe(this.conditionallyRedirectToGame.bind(this)),
    })
  }

  componentWillUnmount() {
    const { unsubscribe } = this.state
    if (unsubscribe) {
      unsubscribe()
    }
  }

  conditionallyRedirectToGame() {
    if (store.getState().game.currentGame.status !== 'NONE') {
      const { history } = this.props
      if (history) {
        history.push('/game')
      }
    }
  }

  render() {
    const { reduxActions } = this.props

    return (
      <div className="app-route-start">
        <EmojiCard
          content="START"
          hoverable="true"
          clicked={reduxActions.joinGame}
        />
      </div>
    )
  }
}

/* REDUX CONNECTION */
const mapStateToProps = (state) => ({
  reduxState: {
    game: state.game,
  },
})
const mapDispatchToProps = (dispatch) => ({
  reduxActions: {
    joinGame: () => dispatch(entries.game.actions.sendJoinGame()),
  },
})

export const ConnectedStartRoute = connect(
  mapStateToProps,
  mapDispatchToProps
)(StartRoute)

export default withRouter(ConnectedStartRoute)
