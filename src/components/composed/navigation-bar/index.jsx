import { useHistory } from 'react-router-dom'

/* Styles */
import './navigation-bar.scss'

const NavigationBar = function ({ routes }) {
  const history = useHistory()

  const createRouteButtons = (routesArray = []) => {
    const currentRoutePath = history.location.pathname
    const routesThatCanBeRendered = routesArray.filter((route) => route.canRender()).filter((route) => route.route !== currentRoutePath)

    return routesThatCanBeRendered.map((route) => (
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
    ))
  }

  const routeButtons = createRouteButtons(routes)
  return routeButtons.length > 0 ? (
    <div className="app-navigation-bar">
      <div className="nav">{routeButtons}</div>
    </div>
  ) : null
}

export { NavigationBar }
