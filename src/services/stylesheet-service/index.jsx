const getVariable = (variableName) => {
  if (typeof variableName === 'string') {
    const style = getComputedStyle(document.body)
    const propertyId = variableName.substring(0, 2) === '--' ? variableName : `--${variableName}`
    return style.getPropertyValue(propertyId)
  }
  throw Error('Variable name has to be a string')
}

export default {
  getVariable,
}

export { getVariable }
