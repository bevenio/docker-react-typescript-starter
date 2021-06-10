import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

// Utility
import RouterUtility from '@/router/utility/router.utility'

// Components
import LoadingPage from '@/components/pages/loading/loading'
import ErrorPage from '@/components/pages/error/error'

// Routes
import LoginRoutes from '@/router/routes/login.routes'
import SettingsRoutes from '@/router/routes/settings.routes'
import LandingRoutes from '@/router/routes/landing.routes'

export class AppRouter extends React.Component {
  constructor() {
    super()
    this.state = {
      router: RouterUtility.getRouter(),
      history: RouterUtility.getHistory(),
    }
  }

  render() {
    const { /* reduxActions, */ reduxState } = this.props
    const { router: Router, history } = this.state

    return (
      <>
        <Helmet>
          <title>{reduxState.appearance.title}</title>
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
