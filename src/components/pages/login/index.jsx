import React from 'react'

import FillAvailable from '@/components/basic/fill-available'
import NavigationBar from '@/components/composed/navigation-bar'
import LoginForm from '@/components/composed/login-form'

import './login.scss'

export default class Login extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <>
        <NavigationBar />
        <FillAvailable>
          <LoginForm
            onSuccess={() => {
              this.props.history.push('/')
            }}
            onFailure={() => {}}
          />
        </FillAvailable>
      </>
    )
  }
}
