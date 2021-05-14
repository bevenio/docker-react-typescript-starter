import React from 'react'
import { Route } from 'react-router-dom'

const createSubroutes = (subrouteConfigurations) => () => {
  const subroutes = subrouteConfigurations.map((subroute) => (
    <Route
      path={subroute.path}
      exact={subroute.exact}
      component={subroute.component}
      key={`subroute-${subroute.key}`}
    />
  ))
  return <>{subroutes}</>
}

export default {
  createSubroutes,
}
