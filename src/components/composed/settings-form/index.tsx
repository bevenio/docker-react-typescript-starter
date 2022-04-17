import { useDispatch, useSelector } from 'react-redux'
import { actions } from '@/store/store'

/* Styles */
import './settings-form.scss'

/* Components */
import { InputSwitch } from '@/components/basic/input-switch'

/* Services */
import { Translator } from '@/services/translation-service'

const translations = Translator.translateBatch('components.composed.settings-form')

const SettingsForm = function () {
  const theme = useSelector((state: ReduxState) => state.settings.theme)
  const animations = useSelector((state: ReduxState) => state.settings.animations)
  const dispatch = useDispatch()

  const animationsChanged = (isOn: boolean) => {
    dispatch(actions.settings.changeAnimations({ animations: !!isOn }))
  }

  const darkmodeChanged = (isOn: boolean) => {
    dispatch(actions.settings.changeTheme({ theme: isOn ? 'dark' : 'light' }))
  }

  return (
    <form className="app-settings-form">
      <InputSwitch name="darkmode" label={translations.darkmode} isOn={theme === 'dark'} onChange={darkmodeChanged} />
      <InputSwitch name="animations" label={translations.animations} isOn={animations === true} onChange={animationsChanged} />
    </form>
  )
}

export { SettingsForm }
