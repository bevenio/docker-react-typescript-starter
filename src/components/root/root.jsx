import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

import Start from '@/components/routes/start/start'
import Game from '@/components/routes/game/game'
import Demo from '@/components/stateful/demo/demo'

export class Root extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    const { /* reduxActions, */ reduxState } = this.props

    return (
      <>
        <Helmet>
          <title>{reduxState.appearance.title}</title>
          <link rel="manifest" href="/static/manifest.json" />
          <html
            lang={reduxState.appearance.languageID}
            className={`app-theme-${reduxState.appearance.theme}`}
          />
        </Helmet>
        <Router>
          <Switch>
            <Route path="/demo">
              <Demo />
            </Route>
            <Route path="/start">
              <Start />
            </Route>
            <Route path="/game">
              <Game />
            </Route>
            <Route>
              <Start />
            </Route>
          </Switch>
        </Router>
      </>
    )
  }
}

// Redux Connection
const mapStateToProps = (state) => ({
  reduxState: {
    appearance: state.appearance,
  },
})
const mapDispatchToProps = (/* dispatch */) => ({
  reduxActions: {},
})
export default connect(mapStateToProps, mapDispatchToProps)(Root)
