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
    iconButtonsData.map((iconButtonData) => this.createIconButton(iconButtonData))

  render() {
    const { navigationButtons } = this.props
    return (
      <div className="app-navigation-bar">
        <div className="nav">
          <img className="nav-logo" src="static/images/icon-192x192.png" alt="nav-logo" />
          {this.createIconButtons(navigationButtons)}
        </div>
      </div>
    )
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
