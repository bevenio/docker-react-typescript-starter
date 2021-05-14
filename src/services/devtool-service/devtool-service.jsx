/* @flow */
/* eslint-disable import/no-extraneous-dependencies */

/*
 * Description:
 * This service is made to import devtool extensions and modules
 * These modules can be located in "dev-dependencies" when imported here,
 * since they are conditionaly imported only in "development" mode
 * Importing extraneous dependencies is forbidden outside this service
 */

// Is current execution in "development" mode?
const isDevMode = process.env.NODE_ENV === 'development'

// Importing modules
const { composeWithDevTools } = isDevMode
  ? require('redux-devtools-extension')
  : { composeWithDevTools: null }

// Function for applyinhg redux browser devtools
const applyReduxExtensionDevtools = (middleware) => {
  if (composeWithDevTools) {
    return composeWithDevTools(middleware)
  }
  return middleware
}

export default {
  isDevMode,
  applyReduxExtensionDevtools,
}

export { isDevMode, applyReduxExtensionDevtools }
