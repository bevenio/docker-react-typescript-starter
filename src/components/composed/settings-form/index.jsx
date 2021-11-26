import React from 'react'
import { connect } from 'react-redux'
import { entries } from '@/store/store'

/* Styles */
import './settings-form.scss'

/* Components */
import InputSwitch from '@/components/basic/input-switch'

/* Services */
import Translator from '@/services/translation-service'

const translations = Translator.translateBatch('components.composed.settings-form')

export class SettingsForm extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  animationsChanged = (isOn) => {
    const { changeAnimations } = this.props.reduxActions
    changeAnimations(!!isOn)
  }

  darkmodeChanged = (isOn) => {
    const { changeTheme } = this.props.reduxActions
    changeTheme(isOn ? 'dark' : 'light')
  }

  render() {
    const { theme, animations } = this.props.reduxState.settings

    return (
      <form className="app-settings-form">
        <InputSwitch
          name="darkmode"
          label={translations.darkmode}
          isOn={theme === 'dark'}
          onChange={this.darkmodeChanged}
        />
        <InputSwitch
          name="animations"
          label={translations.animations}
          isOn={animations === true}
          onChange={this.animationsChanged}
        />
      </form>
    )
  }
}

// Redux Connection
const mapStateToProps = (state) => ({
  reduxState: {
    settings: state.settings,
  },
})
const mapDispatchToProps = (dispatch) => ({
  reduxActions: {
    changeAnimations: (animations) => {
      dispatch(entries.actions.settings.changeAnimations(animations))
    },
    changeTheme: (theme) => {
      dispatch(entries.actions.settings.changeTheme(theme))
    },
  },
})
export default connect(mapStateToProps, mapDispatchToProps)(SettingsForm)
