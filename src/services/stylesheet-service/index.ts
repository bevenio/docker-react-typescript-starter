const getVariable = (variableName: string): string => {
  const style = getComputedStyle(document.body)
  const propertyId = variableName.substring(0, 2) === '--' ? variableName : `--${variableName}`
  const propertyValue = style.getPropertyValue(propertyId)
  return propertyValue
}

export { getVariable }
