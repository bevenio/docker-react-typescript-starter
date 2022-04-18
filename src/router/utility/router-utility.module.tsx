import { get } from 'dot-prop'
import { Redirect, BrowserRouter as PathRouter, HashRouter } from 'react-router-dom'

import { store } from '@/store/store'
import { ErrorPage } from '@/components/pages/error'
import { RouteLayout } from '@/components/basic/route-layout'

type RouteType = 'hash' | 'path'

interface RouteParameters {
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

const createRoute = ({ component, route, redirection, dependencies }: RouteParameters) => {
  const mustRedirect = () =>
    !(dependencies
      ? Object.keys(dependencies).reduce((previous, current) => {
          if (previous === false) {
            return false
          }
          const dependencyValue = get(store.getState(), current)
          const dependencyComparison = dependencies[current]

          // Dependency can be checked by its value or by validator function
          return typeof dependencyComparison === 'function' ? !!dependencyComparison(dependencyValue) : dependencyValue === dependencyComparison
        }, true)
      : true)

  // Decide what component to return
  const renderFunction = () => {
    const Component = component
    const redirect = mustRedirect()
    if (redirect && !!redirection) {
      return <Redirect to={redirection} />
    }
    if (redirect && !redirection) {
      return <ErrorPage />
    }
    return (
      <RouteLayout>
        <Component />
      </RouteLayout>
    )
  }

  // A function that returns if a route can be displayed
  const canRenderFunction = () => !mustRedirect()

  return {
    route,
    render: renderFunction,
    canRender: canRenderFunction,
  }
}

export { getRouteType, getRouters, createRoute }
