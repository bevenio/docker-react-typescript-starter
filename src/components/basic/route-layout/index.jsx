import React, { useEffect } from 'react'

/* Styles */
import './route-layout.scss'

const RouteLayout = function ({ children }) {
  const routeReference = React.createRef()

  useEffect(() => {
    routeReference.current.focus()
  }, [])

  return (
    <span ref={routeReference} className="app-route-layout">
      {children}
    </span>
  )
}

export default RouteLayout
