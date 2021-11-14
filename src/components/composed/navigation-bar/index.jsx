import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

/* Styles */
import './navigation-bar.scss'

/* Services */
import Translator from '@/services/translation-service'

const translations = Translator.translateBatch('components.composed.navigation-bar')

export class NavigationBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  createHomeButton = (hasHomeButton = false) =>
    hasHomeButton ? (
      <button
        key="app-navigation-button-home"
        className="app-navigation-button"
        type="button"
        onClick={() => {
          this.props.history.push('/')
        }}
      >
        {translations.home}
      </button>
    ) : null

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
    const { navigationButtons, hasHomeButton } = this.props

    return (
      <div className="app-navigation-bar">
        <div className="nav">
          {this.createHomeButton(hasHomeButton)}
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
