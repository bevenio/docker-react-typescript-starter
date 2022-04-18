/* Styles */
import './input-field.scss'

interface Props {
  name?: string
  type?: string
  label?: string
  placeholder?: string
  autocomplete?: string
  onValidate?: (...args: unknown[]) => string
  onChange?: (value: string) => void
}

const InputField: React.FC<Props> = function ({
  name = 'no-name',
  type = 'text',
  label = '',
  placeholder = '',
  autocomplete = 'off',
  onValidate = () => '',
  onChange = () => {},
}) {
  const identifier = `app-input-field-${name}`

  const valueChanged = (event: React.FormEvent<HTMLInputElement>) => {
    onChange(event.currentTarget.value)
    const validationResult = onValidate(event.currentTarget.value)
    event.currentTarget.setCustomValidity(validationResult)
  }

  return (
    <>
      <label htmlFor={identifier}>{label}</label>
      <input
        type={type}
        id={identifier}
        placeholder={placeholder}
        autoComplete={autocomplete}
        onPaste={valueChanged}
        onBlur={valueChanged}
        onFocus={valueChanged}
        onChange={valueChanged}
      />
    </>
  )
}

export { InputField }
