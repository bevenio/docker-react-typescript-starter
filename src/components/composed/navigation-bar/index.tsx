import { useHistory } from 'react-router-dom'

/* Styles */
import './navigation-bar.scss'

interface NavigationRoute {
  route: string
  canRender: () => boolean
}

const NavigationButton = function (route: NavigationRoute) {
  const history = useHistory()

  return (
    <button
      key={`app-navigation-button-${route.route}`}
      className="app-navigation-button"
      type="button"
      onClick={() => {
        history.push(route.route)
      }}
    >
      {route.route}
    </button>
  )
}

const NavigationBar = function ({ routes }: { routes: NavigationRoute[] }) {
  const history = useHistory()

  const createNavigationButtons = (routeDeclarations: NavigationRoute[]): React.ReactNode[] => {
    const currentRoutePath = history.location.pathname
    const routesThatCanBeRendered = routeDeclarations.filter((route) => route.canRender()).filter((route) => route.route !== currentRoutePath)
    return routesThatCanBeRendered.map((route) => NavigationButton(route))
  }

  const routeButtons = createNavigationButtons(routes)
  return routeButtons.length > 0 ? (
    <div className="app-navigation-bar">
      <div className="nav">{routeButtons}</div>
    </div>
  ) : null
}

export { NavigationBar }
