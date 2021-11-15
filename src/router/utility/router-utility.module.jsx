import React from 'react'
import dotProp from 'dot-prop'
import { Redirect, BrowserRouter as PathRouter, HashRouter } from 'react-router-dom'
import { hot } from 'react-hot-loader/root'

import { store } from '@/store/store'
import ErrorPage from '@/components/pages/error'

const isAppUsingHashRoute = !!window.location.hash
const router = isAppUsingHashRoute ? hot(HashRouter) : hot(PathRouter)

const getRouter = () => router

const createRoute = ({ component: Component, route, redirection, dependencies }) => {
  const mustRedirect = () =>
    !(dependencies
      ? Object.keys(dependencies).reduce((previous, current) => {
          if (previous === false) {
            return false
          }
          const dependencyValue = dotProp.get(store.getState(), current)
          const dependencyComparison = dependencies[current]

          // Dependency can be checked by its value or by validator function
          return typeof dependencyComparison === 'function'
            ? !!dependencyComparison(dependencyValue)
            : dependencyValue === dependencyComparison
        }, true)
      : true)

  // Decide what component to return
  const renderFunction = () => {
    const redirect = mustRedirect()
    if (redirect && !!redirection) {
      return <Redirect to={redirection} />
    }
    if (redirect && !redirection) {
      return <ErrorPage />
    }
    return <Component />
  }

  // A function that returns if a route can be displayed
  const canRenderFunction = () => !mustRedirect()

  return {
    route,
    render: renderFunction,
    canRender: canRenderFunction,
  }
}

export default {
  getRouter,
  createRoute,
}
