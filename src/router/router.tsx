import { Suspense, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Route, Switch, useLocation } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

/* Utility */
import { getRouteType, getRouters } from '@/router/utility/router-utility.module'

/* Services */
import { registerServiceworker } from '@/services/serviceworker-service'
import { Translator } from '@/services/translation-service'

/* Components */
import { NavigationBar } from '@/components/composed/navigation-bar'
import { LoadingPage } from '@/components/pages/loading'
import { ErrorPage } from '@/components/pages/error'

/* Routes */
import { LoginRoute } from '@/router/routes/login.route'
import { SettingsRoute } from '@/router/routes/settings.route'
import { MainRoute } from '@/router/routes/main.route'

function AppRoutes() {
  const location = useLocation()

  return (
    <>
      <NavigationBar routes={[LoginRoute, SettingsRoute, MainRoute]} />
      <TransitionGroup>
        <CSSTransition key={location.key} classNames="app-route-change" timeout={1000}>
          <Suspense fallback={<LoadingPage />}>
            <Switch location={location}>
              <Route path={LoginRoute.route} render={LoginRoute.render} />
              <Route path={SettingsRoute.route} render={SettingsRoute.render} />
              <Route path={MainRoute.route} render={MainRoute.render} />
              <Route component={ErrorPage} />
            </Switch>
          </Suspense>
        </CSSTransition>
      </TransitionGroup>
    </>
  )
}

const AppRouter = function () {
  const type = getRouteType()
  const Routers = getRouters()
  const title = useSelector((state: ReduxState) => state.settings.title)
  const theme = useSelector((state: ReduxState) => state.settings.theme)

  useEffect(() => {
    registerServiceworker()
  }, [])

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <link rel="icon" type="image/png" href="./static/images/icons/icon-192x192.png" />
        <html lang={Translator.code} color-scheme={theme} />
      </Helmet>
      {type === 'hash' ? (
        <Routers.hash>
          <AppRoutes />
        </Routers.hash>
      ) : (
        <Routers.path>
          <AppRoutes />
        </Routers.path>
      )}
    </>
  )
}

export { AppRouter }
