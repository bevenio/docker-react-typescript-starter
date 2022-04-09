import { useDispatch, useSelector } from 'react-redux'
import { entries } from '@/store/store'

/* Styles */
import './settings-form.scss'

/* Components */
import { InputSwitch } from '@/components/basic/input-switch'

/* Services */
import { Translator } from '@/services/translation-service'

const translations = Translator.translateBatch('components.composed.settings-form')

const SettingsForm = function () {
  const theme = useSelector((state) => state.settings.theme)
  const animations = useSelector((state) => state.settings.animations)
  const dispatch = useDispatch()

  const animationsChanged = (isOn) => {
    dispatch(entries.actions.settings.changeAnimations(!!isOn))
  }

  const darkmodeChanged = (isOn) => {
    dispatch(entries.actions.settings.changeTheme(isOn ? 'dark' : 'light'))
  }

  return (
    <form className="app-settings-form">
      <InputSwitch name="darkmode" label={translations.darkmode} isOn={theme === 'dark'} onChange={darkmodeChanged} />
      <InputSwitch name="animations" label={translations.animations} isOn={animations === true} onChange={animationsChanged} />
    </form>
  )
}

export { SettingsForm }
