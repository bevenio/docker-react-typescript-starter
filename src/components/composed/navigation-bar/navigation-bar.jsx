import React from 'react'
import { connect } from 'react-redux'

import './navigation-bar.scss'

export class NavigationBar extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <div className="app-navigation-bar">
        <div className="nav">
          <h5 className="nav-logo">{this.props.reduxState.appearance.title}</h5>
        </div>
      </div>
    )
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
