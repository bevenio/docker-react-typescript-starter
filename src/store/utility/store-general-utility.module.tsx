interface ActionTypeKeys {
  [key: string]: string
}

const extendConstants = (constantPrepend: string, constants: ActionTypeKeys): ActionTypeKeys => {
  const extendedConstants: ActionTypeKeys = {}
  const keys = Object.keys(constants)
  for (let i = 0; i < keys.length; i += 1) {
    extendedConstants[keys[i]] = `${constantPrepend}:${constants[keys[i]]}`
  }
  return extendedConstants
}

export { extendConstants }
