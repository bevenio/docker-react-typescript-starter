import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { entries } from '@/store/store'
import { usePrevious } from '@/hooks'

/* Styles */
import './login-form.scss'

/* Components */
import { InputField } from '@/components/basic/input-field'

/* Services */
import { Translator } from '@/services/translation-service'

/* Translations */
const translations = Translator.translateBatch('components.composed.login-form')

const LoginForm = function ({ onSuccess, onFailure }) {
  const CONSTANTS = {
    IDENTIFIER_MIN_LENGTH: 3,
    PASSWORD_MIN_LENGTH: 8,
  }

  // Component state
  const [isLocalRequestInProgress, setLocalRequestInProgress] = useState(false)
  const [password, setPassword] = useState('')
  const [identifier, setIdentifier] = useState('')

  // Component hooks
  const authStatus = useSelector((state) => state.auth.status)
  const previousStatus = usePrevious(authStatus)
  const dispatch = useDispatch()

  // Component business logic
  const identifierValidator = () => (identifier.length >= CONSTANTS.IDENTIFIER_MIN_LENGTH || !identifier ? true : 'Identifier is too short')

  const passwordValidator = () => (password.length >= CONSTANTS.PASSWORD_MIN_LENGTH || !password ? true : 'Password is too short')

  const isRequesInProgress = () => authStatus === 'TRYING'

  const login = (event) => {
    event.preventDefault()
    setLocalRequestInProgress(true)
    dispatch(entries.actions.auth.requestLogin({ identifier, password }))
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
  }, [authStatus, password, identifier])

  // Component render
  return (
    <form className="app-login-form" onSubmit={login}>
      <center>
        <h2>{translations.login}</h2>
      </center>
      <InputField label={translations.username} type="text" name="login-identifier" onValidate={identifierValidator} onChange={setIdentifier} />
      <InputField label={translations.password} type="password" name="login-password" onValidate={passwordValidator} onChange={setPassword} />
      <button type="submit" className="primary" disabled={isRequesInProgress()}>
        {translations.login}
      </button>
    </form>
  )
}

export { LoginForm }
