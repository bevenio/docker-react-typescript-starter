import React from 'react'
import { Route } from 'react-router-dom'
import dotProp from 'dot-prop'

import { store } from '@/store/redux-store'
import Page401 from '@/components/pages/page-401/page-401'

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
              return (
                dotProp.get(store.getState(), current) ===
                subroute.dependsOn[current]
              )
            }, true)
          : true

        const ActualComponent = isAllowedToOpenRoute
          ? subroute.component
          : Page401

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
