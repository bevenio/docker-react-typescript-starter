import React, { Suspense } from 'react'
import { Route, Router, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

// Components
import FillAvailable from '@/component-library/fill-available/fill-available'
import NotAllowed from '@/component-library/not-allowed/not-allowed'
import LoadingSpinner from '@/component-library/loading-spinner/loading-spinner'

// Routes
import DemoRoutes from '@/router/routes/demo.routes'

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
    this.state = {
      history: createBrowserHistory(),
    }
  }

  render() {
    const { /* reduxActions, */ reduxState } = this.props
    const { history } = this.state

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
              <Route path={DemoRoutes.route} render={DemoRoutes.subroutes} />
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
