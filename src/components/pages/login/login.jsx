import React from 'react'

import FillAvailable from '@/components/basic/fill-available/fill-available'
import LoginForm from '@/components/composed/login-form/login-form'

import './login.scss'

export default class Login extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <FillAvailable>
        <LoginForm
          onSuccess={() => {
            window.alert('LOGGED IN!')
          }}
          onFailure={() => {
            window.alert('WRONG CREDENTIALS!')
          }}
        />
      </FillAvailable>
    )
  }
}
