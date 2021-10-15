import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

// Utility
import RouterUtility from '@/router/utility/router-utility.module'

// Services
import ServiceworkerService from '@/services/serviceworker-service'

// Components
import LoadingPage from '@/components/pages/loading'
import ErrorPage from '@/components/pages/error'

// Routes
import LoginRoute from '@/router/routes/login.route'
import SettingsRoute from '@/router/routes/settings.route'
import LandingRoute from '@/router/routes/landing.route'
import GameRoute from '@/router/routes/game.route'

export class AppRouter extends React.Component {
  constructor() {
    super()
    this.state = {
      router: RouterUtility.getRouter(),
    }
  }

  componentDidMount() {
    ServiceworkerService.registerServiceworker()
  }

  render() {
    const { /* reduxActions, */ reduxState } = this.props
    const { router: Router } = this.state

    return (
      <>
        <Helmet>
          <title>{reduxState.appearance.title}</title>
          <link rel="icon" type="image/png" href="./static/images/icon-192x192.png" />
          <html
            lang={reduxState.appearance.languageID}
            color-scheme={reduxState.appearance.theme}
          />
        </Helmet>
        <Router basename="/">
          <Suspense fallback={<LoadingPage />}>
            <Switch>
              <Route path={LoginRoute.route} render={LoginRoute.render} />
              <Route path={SettingsRoute.route} render={SettingsRoute.render} />
              <Route path={GameRoute.route} render={GameRoute.render} />
              <Route path={LandingRoute.route} render={LandingRoute.render} />
              <Route component={ErrorPage} />
            </Switch>
          </Suspense>
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
export default connect(mapStateToProps, mapDispatchToProps)(AppRouter)
