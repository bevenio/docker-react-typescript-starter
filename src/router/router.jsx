import React, { Suspense } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Route, Switch, useLocation } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

/* Utility */
import RouterUtility from '@/router/utility/router-utility.module'

/* Services */
import ServiceworkerService from '@/services/serviceworker-service'
import Translator from '@/services/translation-service'

/* Components */
import LoadingPage from '@/components/pages/loading'
import ErrorPage from '@/components/pages/error'

/* Routes */
import LoginRoute from '@/router/routes/login.route'
import SettingsRoute from '@/router/routes/settings.route'
import MainRoute from '@/router/routes/main.route'
import GameRoute from '@/router/routes/game.route'

const AppRoutes = (/* props */) => {
  const location = useLocation()

  return (
    <TransitionGroup className="app-router-transition-group">
      <CSSTransition key={location.key} classNames="app-route-change" timeout={1000}>
        <Suspense fallback={<LoadingPage />}>
          <Switch location={location}>
            <Route path={LoginRoute.route} render={LoginRoute.render} />
            <Route path={SettingsRoute.route} render={SettingsRoute.render} />
            <Route path={GameRoute.route} render={GameRoute.render} />
            <Route path={MainRoute.route} render={MainRoute.render} />
            <Route component={ErrorPage} />
          </Switch>
        </Suspense>
      </CSSTransition>
    </TransitionGroup>
  )
}

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
          <title>{reduxState.settings.title}</title>
          <link rel="icon" type="image/png" href="./static/images/icons/icon-192x192.png" />
          <html lang={Translator.code} color-scheme={reduxState.settings.theme} />
        </Helmet>
        <Router basename="/">
          <AppRoutes />
        </Router>
      </>
    )
  }
}

/* Redux Connection  */
const mapStateToProps = (state) => ({
  reduxState: {
    settings: state.settings,
  },
})
const mapDispatchToProps = (/* dispatch */) => ({
  reduxActions: {},
})
export default connect(mapStateToProps, mapDispatchToProps)(AppRouter)
