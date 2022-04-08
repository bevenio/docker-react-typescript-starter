import React, { useState } from 'react'

/* Styles */
import './input-switch.scss'

export function InputField({ name = `no-name`, label = '', isOn = false, onChange = () => {} }) {
  const identifier = `app-input-switch-${name}`
  const [isSwitchChecked, setSwitchChecked] = useState(isOn)

  const valueChanged = (event) => {
    setSwitchChecked(event.target.checked)
    onChange(event.target.checked)
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

export default InputField
