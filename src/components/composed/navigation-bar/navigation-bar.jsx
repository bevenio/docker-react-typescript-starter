import React from 'react'
import { connect } from 'react-redux'

import './navigation-bar.scss'

export class NavigationBar extends React.Component {
  constructor() {
    super()
    this.state = {
      isMobileNavigation: false,
    }
  }

  componentDidMount() {
    this.registerEventListeners()
  }

  componentWillUnmount() {
    this.unregisterEventListeners()
  }

  unregisterEventListeners = () => {}

  registerEventListeners = () => {
    const mobileSize = 800
    window.addEventListener('resize', (event) => {
      if (event.target.innerWidth <= mobileSize) {
        this.setState({ isMobileNavigation: true })
      } else {
        this.setState({ isMobileNavigation: false })
      }
    })
  }

  renderMobileNavigation() {
    return (
      <div className="app-navigation-bar-mobile">
        <div className="nav">
          <h5 className="nav-logo">{this.props.reduxState.appearance.title}</h5>
        </div>
      </div>
    )
  }

  renderBrowserNavigation() {
    return (
      <div className="app-navigation-bar-browser">
        <div className="nav">
          <h5 className="nav-logo">{this.props.reduxState.appearance.title}</h5>
        </div>
      </div>
    )
  }

  render() {
    return this.state.isMobileNavigation
      ? this.renderMobileNavigation()
      : this.renderBrowserNavigation()
  }
}

// Redux Connection
const mapStateToProps = (state) => ({
  reduxState: {
    appearance: state.appearance,
  },
})
const mapDispatchToProps = (/* dispatch */) => ({
  reduxActions: {},
})
export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar)
