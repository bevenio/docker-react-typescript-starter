import React from 'react'
import { Route } from 'react-router-dom'
import dotProp from 'dot-prop'

import { store } from '@/store/store'
import ErrorCode from '@/components/pages/error-code/error-code'

const createRoute = ({ route, subroutes }) => {
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
                ? dependencyComparison(dependencyValue)
                : dependencyValue === dependencyComparison
            }, true)
          : true

        const ActualComponent = isAllowedToOpenRoute
          ? subroute.component
          : ErrorCode

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
    subroutes: subrouteComponent,
  }
}

export default {
  createRoute,
}
