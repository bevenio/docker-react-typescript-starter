import React from 'react'

/* Styles */
import './route-layout.scss'

class RouteLayout extends React.Component {
  constructor() {
    super()
    this.state = {
      routeReference: React.createRef(),
    }
  }

  componentDidMount() {
    this.state.routeReference.current.focus()
  }

  render() {
    const { children } = this.props
    return (
      <span ref={this.state.routeReference} className="app-route-layout">
        {children}
      </span>
    )
  }
}

export default RouteLayout
