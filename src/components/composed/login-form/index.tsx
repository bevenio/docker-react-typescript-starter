import { FormEvent, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actions } from '@/store/store'
import { usePrevious } from '@/hooks'

/* Styles */
import './login-form.scss'

/* Components */
import { InputField } from '@/components/basic/input-field'

/* Services */
import { Translator } from '@/services/translation-service'

/* Translations */
const translations = Translator.translateBatch('components.composed.login-form')

interface Props {
  onSuccess: (...args: unknown[]) => void
  onFailure: (...args: unknown[]) => void
}

const LoginForm: React.FC<Props> = function ({ onSuccess, onFailure }) {
  const CONSTANTS = {
    IDENTIFIER_MIN_LENGTH: 3,
    PASSWORD_MIN_LENGTH: 8,
  }

  // Component state
  const [isLocalRequestInProgress, setLocalRequestInProgress] = useState(false)
  const [password, setPassword] = useState('')
  const [identifier, setIdentifier] = useState('')

  // Component hooks
  const authStatus = useSelector((state: ReduxState) => state.auth.status)
  const previousStatus = usePrevious(authStatus)
  const dispatch = useDispatch()

  // Component business logic
  const identifierValidator = () => (identifier.length >= CONSTANTS.IDENTIFIER_MIN_LENGTH || !identifier ? '' : 'Identifier is too short')

  const passwordValidator = () => (password.length >= CONSTANTS.PASSWORD_MIN_LENGTH || !password ? '' : 'Password is too short')

  const isRequesInProgress = () => authStatus === 'TRYING'

  const login = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLocalRequestInProgress(true)
    dispatch(actions.auth.requestLogin({ identifier, password }))
  }

  // Component effects
  useEffect(() => {
    const didLoginSucceed = previousStatus !== 'SUCCEEDED' && authStatus === 'SUCCEEDED'
    if (didLoginSucceed && isLocalRequestInProgress) {
      if (onSuccess) {
        onSuccess()
        setLocalRequestInProgress(false)
      }
    } else if (authStatus === 'FAILED' && isLocalRequestInProgress) {
      if (onFailure) {
        onFailure()
        setLocalRequestInProgress(false)
      }
    }
  }, [authStatus, isLocalRequestInProgress])

  // Component render
  return (
    <form className="app-login-form" onSubmit={login}>
      <span>
        <h2>{translations.login}</h2>
      </span>
      <InputField
        label={translations.username}
        type="text"
        name="login-identifier"
        autocomplete="username"
        onValidate={identifierValidator}
        onChange={setIdentifier}
      />
      <InputField
        label={translations.password}
        type="password"
        name="login-password"
        autocomplete="current-password"
        onValidate={passwordValidator}
        onChange={setPassword}
      />
      <button type="submit" className="primary" disabled={isRequesInProgress()}>
        {translations.login}
      </button>
    </form>
  )
}

export { LoginForm }
