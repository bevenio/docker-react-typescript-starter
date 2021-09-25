import React from 'react'

import StylesheetService from '@/services/stylesheet-service'

import FillAvailable from '@/components/basic/fill-available'
import LoginForm from '@/components/composed/login-form'
import NoiseBackground from '@/components/basic/noise-background'

import './login.scss'

export default class Login extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <>
        <NoiseBackground color={StylesheetService.getVariable('--color-brand-alt')}>
          <FillAvailable>
            <LoginForm
              onSuccess={() => {
                this.props.history.push('/')
              }}
              onFailure={() => {}}
            />
          </FillAvailable>
        </NoiseBackground>
      </>
    )
  }
}
