import React from 'react'

import './input-field.scss'

export const InputField = ({
  name = 'no-name',
  type = 'text',
  label = '',
  placeholder = '',
  onChange = () => {},
}) => {
  const identifier = `app-input-field-${name}`

  return (
    <>
      <label htmlFor={identifier}>{label}</label>
      <input
        type={type}
        id={identifier}
        placeholder={placeholder}
        onChange={(event) => {
          onChange(event.target.value)
        }}
      />
    </>
  )
}

export default InputField
