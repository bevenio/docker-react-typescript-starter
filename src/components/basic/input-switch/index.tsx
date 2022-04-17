import { useState } from 'react'

/* Styles */
import './input-switch.scss'

interface Props {
  name?: string
  label?: string
  isOn?: boolean
  onChange?: (value: boolean) => void
}

const InputSwitch: React.FC<Props> = function ({ name = `no-name`, label = '', isOn = false, onChange = () => {} }) {
  const identifier = `app-input-switch-${name}`
  const [isSwitchChecked, setSwitchChecked] = useState(isOn)

  const valueChanged = (event: React.FormEvent<HTMLInputElement>) => {
    setSwitchChecked(event.currentTarget.checked)
    onChange(event.currentTarget.checked)
  }

  return (
    <div className="app-input-switch-container">
      <label htmlFor={identifier} className="app-input-switch">
        <input id={identifier} type="checkbox" checked={isSwitchChecked} onChange={valueChanged} />
        <span className="app-input-switch-slider" />
      </label>
      <span className="app-input-switch-text">{label}</span>
    </div>
  )
}

export { InputSwitch }
