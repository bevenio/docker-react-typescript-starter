import React, { Suspense } from 'react'
import { Route, BrowserRouter, HashRouter, Switch } from 'react-router-dom'
import { createBrowserHistory, createHashHistory } from 'history'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

// Components
import FillAvailable from '@/components/basic/fill-available/fill-available'
import NotAllowed from '@/components/basic/not-allowed/not-allowed'
import LoadingSpinner from '@/components/basic/loading-spinner/loading-spinner'

// Routes
import LoginRoutes from '@/router/routes/login.routes'

const WrongRoute = () => (
  <FillAvailable>
    <NotAllowed />
  </FillAvailable>
)

const LoadingFullscreen = () => (
  <FillAvailable>
    <LoadingSpinner />
  </FillAvailable>
)

export class AppRouter extends React.Component {
  constructor() {
    super()
    if (window.location.hash) {
      this.state = {
        router: HashRouter,
        history: createHashHistory(),
      }
    } else {
      this.state = {
        router: BrowserRouter,
        history: createBrowserHistory(),
      }
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
            className={`app-theme-${reduxState.appearance.theme}`}
          />
        </Helmet>
        <Router basename="/" history={history}>
          <Suspense fallback={<LoadingFullscreen />}>
            <Switch>
              <Route path={LoginRoutes.route} render={LoginRoutes.subroutes} />
              <Route component={WrongRoute} />
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
