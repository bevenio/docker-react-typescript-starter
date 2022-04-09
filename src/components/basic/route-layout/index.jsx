import { useEffect, createRef } from 'react'

/* Styles */
import './route-layout.scss'

const RouteLayout = function ({ children }) {
  const routeReference = createRef()

  useEffect(() => {
    routeReference.current.focus()
  }, [])

  return (
    <span ref={routeReference} className="app-route-layout">
      {children}
    </span>
  )
}

export { RouteLayout }
