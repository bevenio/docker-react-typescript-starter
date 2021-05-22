import React from 'react'
import { connect } from 'react-redux'
import { entries } from '@/store/store'

import InputField from '@/components/basic/input-field/input-field'

import './login-form.scss'

export class LoginForm extends React.Component {
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
    } else if (
      this.props.reduxState.auth.status === 'FAILED' &&
      this.state.isRequesInProgress
    ) {
      if (this.state.failure) {
        this.state.failure()
        this.resetRequestProgress()
      }
    }
  }

  identifierValidator = () =>
    this.state.identifier.length >= 4 ? true : 'Identifier is too short'

  passwordValidator = () =>
    this.state.identifier.length >= 4 ? true : 'Password is too short'

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
      <form className="app-login-form">
        <center>
          <h2>Login</h2>
        </center>
        <InputField
          label="Username / Email"
          type="text"
          name="login-identifier"
          onValidate={this.identifierValidator}
          onChange={(identifier) => this.setState({ identifier })}
        />
        <InputField
          label="Password"
          type="password"
          name="login-password"
          onValidate={this.passwordValidator}
          onChange={(password) => this.setState({ password })}
        />
        <button
          type="button"
          className="primary"
          disabled={this.isRequesInProgress()}
          onClick={this.login}
        >
          Login
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
      dispatch(entries.auth.actions.requestLogin({ identifier, password }))
    },
  },
})
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
