import React from 'react'
import dotProp from 'dot-prop'
import { createBrowserHistory, createHashHistory } from 'history'
import { Route, Router as PathRouter, HashRouter } from 'react-router-dom'
import { hot } from 'react-hot-loader/root'

import { store } from '@/store/store'
import ErrorPage from '@/components/pages/error'

const isAppUsingHashRoute = !!window.location.hash
const history = isAppUsingHashRoute ? createHashHistory() : createBrowserHistory()
const router = isAppUsingHashRoute ? hot(HashRouter) : hot(PathRouter)

const getRouter = () => router

const getHistory = () => history

const createRoute = ({ route, exact, subroutes }) => {
  // Creating a function for the router to be able to create routes of
  const subrouteComponent = () => (
    <>
      {subroutes.map((subroute) => {
        // Only allowing to open route if all dependencies in store are fullfilled
        const isAllowedToOpenRoute = subroute.dependsOn
          ? Object.keys(subroute.dependsOn).reduce((previous, current) => {
              if (previous === false) {
                return false
              }
              const dependencyValue = dotProp.get(store.getState(), current)
              const dependencyComparison = subroute.dependsOn[current]

              // Dependency can be checked by its value or by validator function
              return typeof dependencyComparison === 'function'
                ? !!dependencyComparison(dependencyValue)
                : dependencyValue === dependencyComparison
            }, true)
          : true

        let ActualComponent = subroute.component
        if (!isAllowedToOpenRoute && subroute.fallback) {
          ActualComponent = subroute.fallback
        } else if (!isAllowedToOpenRoute && !subroute.fallback) {
          ActualComponent = ErrorPage
        }

        return (
          <Route
            path={subroute.path}
            exact={subroute.exact}
            component={ActualComponent}
            key={`subroute-${subroute.key}`}
          />
        )
      })}
    </>
  )

  return {
    route,
    exact,
    subroutes: subrouteComponent,
  }
}

export default {
  getRouter,
  getHistory,
  createRoute,
}
