import { useEffect, createRef } from 'react'

/* Styles */
import './route-layout.scss'

interface Props {
  children: React.ReactChild[]
}

const RouteLayout: React.FC<Props> = function ({ children }) {
  const routeReference = createRef<HTMLElement>()

  useEffect(() => {
    if (routeReference.current) {
      routeReference.current.focus()
    }
  }, [])

  return (
    <span ref={routeReference} className="app-route-layout">
      {children}
    </span>
  )
}

export { RouteLayout }
