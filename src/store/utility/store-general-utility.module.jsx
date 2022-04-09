const extendConstants = (constantPrepend, constants) => {
  const extendedConstants = {}
  const keys = Object.keys(constants)
  for (let i = 0; i < keys.length; i += 1) {
    extendedConstants[keys[i]] = `${constantPrepend}:${constants[keys[i]]}`
  }
  return extendedConstants
}

export { extendConstants }
