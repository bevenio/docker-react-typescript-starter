/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-var-requires */
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

enum RuntimeMode {
  Development = 'development',
  Production = 'production',
}

const isDevMode = process.env.NODE_ENV === RuntimeMode.Development

// Function for applyinhg redux browser devtools
const applyReduxExtensionDevtools = <T>(middleware: T): T => {
  if (isDevMode) {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(middleware)
  }
  return middleware
}

const applyFastRefresh = (filePath: string): void => {
  if (isDevMode && window) {
    const runtime = require('react-refresh/runtime')
    runtime.injectIntoGlobalHook(window)
    window.$RefreshReg$ = () => {}
    window.$RefreshSig$ = () => () => () => {}
    require(`${filePath}`)
  }
}

export { isDevMode, applyReduxExtensionDevtools, applyFastRefresh }
