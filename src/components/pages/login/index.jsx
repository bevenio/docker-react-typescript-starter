import { useHistory } from 'react-router-dom'

/* Styles */
import './login.scss'

/* Services */
import { getVariable } from '@/services/stylesheet-service'

/* Components */
import { PageLayout } from '@/components/basic/page-layout'
import { FillAvailable } from '@/components/basic/fill-available'
import { LoginForm } from '@/components/composed/login-form'
import { NoiseBackground } from '@/components/basic/noise-background'

const LoginPage = function () {
  const history = useHistory()
  return (
    <NoiseBackground color={getVariable('--color-accent-translucent')}>
      <PageLayout>
        <FillAvailable>
          <LoginForm
            onSuccess={() => {
              history.push('/')
            }}
            onFailure={() => {}}
          />
        </FillAvailable>
      </PageLayout>
    </NoiseBackground>
  )
}

export { LoginPage }
