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
import LoginRoutes from '@/router/routes/login.routes'
import SettingsRoutes from '@/router/routes/settings.routes'
import LandingRoutes from '@/router/routes/landing.routes'
import GameRoutes from '@/router/routes/game.routes'

export class AppRouter extends React.Component {
  constructor() {
    super()
    this.state = {
      router: RouterUtility.getRouter(),
      history: RouterUtility.getHistory(),
    }
  }

  componentDidMount() {
    ServiceworkerService.registerServiceworker()
  }

  render() {
    const { /* reduxActions, */ reduxState } = this.props
    const { router: Router, history } = this.state

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
        <Router basename="/" history={history}>
          <Suspense fallback={<LoadingPage />}>
            <Switch>
              <Route
                exact={LoginRoutes.exact}
                path={LoginRoutes.route}
                render={LoginRoutes.subroutes}
              />
              <Route
                exact={SettingsRoutes.exact}
                path={SettingsRoutes.route}
                render={SettingsRoutes.subroutes}
              />
              <Route
                exact={GameRoutes.exact}
                path={GameRoutes.route}
                render={GameRoutes.subroutes}
              />
              <Route
                exact={LandingRoutes.exact}
                path={LandingRoutes.route}
                render={LandingRoutes.subroutes}
              />
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
