import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import './navigation-bar.scss'

export class NavigationBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  createIconButton = ({ name = '', icon = '', route = '/' }) => (
    <button
      key={`app-navigation-button-${name}`}
      className="app-navigation-button"
      type="button"
      onClick={() => {
        this.props.history.push(route)
      }}
    >
      {icon}
      {name}
    </button>
  )

  createIconButtons = (iconButtonsData = []) =>
    iconButtonsData.map((iconButtonData) =>
      this.createIconButton(iconButtonData)
    )

  render() {
    const { navigationButtons } = this.props
    return (
      <div className="app-navigation-bar">
        <div className="nav">
          <h5 className="nav-logo">{this.props.reduxState.appearance.title}</h5>
          {this.createIconButtons(navigationButtons)}
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NavigationBar))
