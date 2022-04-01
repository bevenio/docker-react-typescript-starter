import React from 'react'

/* Styles */
import './login.scss'

/* Services */
import StylesheetService from '@/services/stylesheet-service'

/* Components */
import PageLayout from '@/components/basic/page-layout'
import FillAvailable from '@/components/basic/fill-available'
import LoginForm from '@/components/composed/login-form'
import NoiseBackground from '@/components/basic/noise-background'

export default class Login extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <NoiseBackground color={StylesheetService.getVariable('--color-accent-translucent')}>
        <PageLayout>
          <FillAvailable>
            <LoginForm
              onSuccess={() => {
                this.props.history.push('/')
              }}
              onFailure={() => {}}
            />
          </FillAvailable>
        </PageLayout>
      </NoiseBackground>
    )
  }
}
