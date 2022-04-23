import { get } from 'dot-prop'
import { Redirect, BrowserRouter as PathRouter, HashRouter } from 'react-router-dom'

import { store } from '@/store/store'
import { ErrorPage } from '@/components/pages/error'
import { RouteLayout } from '@/components/basic/route-layout'
import React from 'react'

type RouteType = 'hash' | 'path'

export interface RouteDescription {
  component: React.FC
  route: string
  redirection: string
  dependencies: {
    [key: string]: (...args: unknown[]) => boolean | boolean
  }
}

const getRouteType = (): RouteType => (window.location.hash ? 'hash' : 'path')

const getRouters = () => ({
  Hash: HashRouter,
  Path: PathRouter,
})

const createRoute = (route: RouteDescription) => {
  // Checks if all dependencies are fulfilled to render a route
  const mustRedirect = (mustRedirectRoute: RouteDescription) =>
    !(mustRedirectRoute.dependencies
      ? Object.keys(mustRedirectRoute.dependencies).reduce((previous, current) => {
          if (previous === false) {
            return false
          }
          const dependencyValue = get(store.getState(), current)
          const dependencyComparison = mustRedirectRoute.dependencies[current]
          return typeof dependencyComparison === 'function' ? !!dependencyComparison(dependencyValue) : dependencyValue === dependencyComparison
        }, true)
      : true)

  // Renders route or its replacement/proxy
  const createRender = (renderRoute: RouteDescription): React.FC =>
    function render() {
      const Component: React.FC = renderRoute.component
      const redirect = mustRedirect(renderRoute)
      if (redirect && !!renderRoute.redirection) {
        return <Redirect to={renderRoute.redirection} />
      }
      if (redirect && !renderRoute.redirection) {
        return <ErrorPage />
      }
      return (
        <RouteLayout>
          <Component />
        </RouteLayout>
      )
    }

  // A function that returns if a route can be displayed
  const createCanRender = (canRenderRoute: RouteDescription) => () => !mustRedirect(canRenderRoute)

  return {
    route: route.route,
    render: createRender(route),
    canRender: createCanRender(route),
  }
}

const createRoutes = (routes: RouteDescription[]) => routes.map((route) => createRoute(route))

export { getRouteType, getRouters, createRoutes }
