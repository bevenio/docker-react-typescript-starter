import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

/* Styles */
import './navigation-bar.scss'

export class NavigationBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  createRouteButtons = (routes = []) => {
    const currentRoutePath = this.props.history.location.pathname
    const routesThatCanBeRendered = routes.filter((route) => route.canRender()).filter((route) => route.route !== currentRoutePath)

    return routesThatCanBeRendered.map((route) => (
      <button
        key={`app-navigation-button-${route.route}`}
        className="app-navigation-button"
        type="button"
        onClick={() => {
          this.props.history.push(route.route)
        }}
      >
        {route.route}
      </button>
    ))
  }

  render() {
    const { routes } = this.props
    const routeButtons = this.createRouteButtons(routes)
    return routeButtons.length > 0 ? (
      <div className="app-navigation-bar">
        <div className="nav">{routeButtons}</div>
      </div>
    ) : null
  }
}

// Redux Connection
const mapStateToProps = (state) => ({
  reduxState: {
    settings: state.settings,
  },
})
const mapDispatchToProps = (/* dispatch */) => ({
  reduxActions: {},
})
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavigationBar))
