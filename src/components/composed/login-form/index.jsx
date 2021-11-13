import React from 'react'
import { connect } from 'react-redux'
import { entries } from '@/store/store'

/* Styles */
import './login-form.scss'

/* Components */
import InputField from '@/components/basic/input-field'

/* Services */
import Translator from '@/services/translation-service'

const translations = Translator.translateBatch('components.composed.login-form')

export class LoginForm extends React.Component {
  CONSTANTS = {
    IDENTIFIER_MIN_LENGTH: 3,
    PASSWORD_MIN_LENGTH: 8,
  }

  constructor({ onSuccess, onFailure }) {
    super()
    this.state = {
      isRequesInProgress: false,
      success: onSuccess,
      failure: onFailure,
      identifier: '',
      password: '',
    }
  }

  componentDidUpdate(previousProps) {
    const didLoginSucceed =
      previousProps.reduxState.auth.status !== 'SUCCEEDED' &&
      this.props.reduxState.auth.status === 'SUCCEEDED'

    if (didLoginSucceed && this.state.isRequesInProgress) {
      if (this.state.success) {
        this.state.success()
        this.resetRequestProgress()
      }
    } else if (this.props.reduxState.auth.status === 'FAILED' && this.state.isRequesInProgress) {
      if (this.state.failure) {
        this.state.failure()
        this.resetRequestProgress()
      }
    }
  }

  identifierValidator = () =>
    this.state.identifier.length >= this.CONSTANTS.IDENTIFIER_MIN_LENGTH || !this.state.identifier
      ? true
      : 'Identifier is too short'

  passwordValidator = () =>
    this.state.identifier.length >= this.CONSTANTS.PASSWORD_MIN_LENGTH || !this.state.password
      ? true
      : 'Password is too short'

  resetRequestProgress = () => {
    this.setState({ isRequesInProgress: false })
  }

  isRequesInProgress = () => this.props.reduxState.auth.status === 'TRYING'

  login = (event) => {
    event.preventDefault()
    this.setState({ isRequesInProgress: true })
    this.props.reduxActions.login(this.state.identifier, this.state.password)
  }

  render() {
    return (
      <form className="app-login-form" onSubmit={this.login}>
        <center>
          <h2>{translations.login}</h2>
        </center>
        <InputField
          label={translations.username}
          type="text"
          name="login-identifier"
          onValidate={this.identifierValidator}
          onChange={(identifier) => this.setState({ identifier })}
        />
        <InputField
          label={translations.password}
          type="password"
          name="login-password"
          onValidate={this.passwordValidator}
          onChange={(password) => this.setState({ password })}
        />
        <button type="submit" className="primary" disabled={this.isRequesInProgress()}>
          {translations.login}
        </button>
      </form>
    )
  }
}

// Redux Connection
const mapStateToProps = (state) => ({
  reduxState: {
    auth: state.auth,
  },
})
const mapDispatchToProps = (dispatch) => ({
  reduxActions: {
    login: (identifier, password) => {
      dispatch(entries.actions.auth.requestLogin({ identifier, password }))
    },
  },
})
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
