/* Styles */
import './input-field.scss'

const InputField = function ({ name = 'no-name', type = 'text', label = '', placeholder = '', onValidate = () => true, onChange = () => {} }) {
  const identifier = `app-input-field-${name}`

  const valueChanged = (event) => {
    onChange(event.target.value)
    const validationResult = onValidate(event.target.value)
    const validationError = validationResult === true ? '' : validationResult
    event.target.setCustomValidity(validationError)
  }

  return (
    <>
      <label htmlFor={identifier}>{label}</label>
      <input
        type={type}
        id={identifier}
        placeholder={placeholder}
        onPaste={valueChanged}
        onBlur={valueChanged}
        onFocus={valueChanged}
        onChange={valueChanged}
      />
    </>
  )
}

export { InputField }
