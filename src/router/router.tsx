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
import { routes } from '@/router/routes'

function AppRoutes() {
  const location = useLocation()

  return (
    <>
      <NavigationBar routes={routes} />
      <TransitionGroup>
        <CSSTransition key={location.key} classNames="app-route-change" timeout={1000}>
          <Suspense fallback={<LoadingPage />}>
            <Switch location={location}>
              {routes.map(({ route, render }) => (
                <Route key={`route-${route}`} path={route} render={render} />
              ))}
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
        <Routers.Hash>
          <AppRoutes />
        </Routers.Hash>
      ) : (
        <Routers.Path>
          <AppRoutes />
        </Routers.Path>
      )}
    </>
  )
}

export { AppRouter }
