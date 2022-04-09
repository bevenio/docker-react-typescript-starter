/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
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

// Function for applyinhg redux browser devtools
const applyReduxExtensionDevtools = (middleware) => {
  const { composeWithDevTools } = isDevMode ? require('redux-devtools-extension') : { composeWithDevTools: null }
  if (composeWithDevTools) {
    return composeWithDevTools(middleware)
  }
  return middleware
}

const applyFastRefresh = (filePath) => {
  if (isDevMode && window) {
    const runtime = require('react-refresh/runtime')
    runtime.injectIntoGlobalHook(window)
    window.$RefreshReg$ = () => {}
    window.$RefreshSig$ = () => () => () => {}
    require(`${filePath}`)
  }
}

export { isDevMode, applyReduxExtensionDevtools, applyFastRefresh }
