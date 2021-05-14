import '@/assets/scss/main.scss'

import { hot } from 'react-hot-loader/root'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import devtoolService from '@/services/devtool-service/devtool-service'
import { store } from '@/store/redux-store'
import Root from '@/components/root/root'

const appRootElementId = 'app'
const appRootElement = document.getElementById(appRootElementId)
const AppReactRootElement = devtoolService.isDevMode ? hot(Root) : Root

if (appRootElement !== null) {
  ReactDOM.render(
    <Provider store={store}>
      <AppReactRootElement />
    </Provider>,
    appRootElement
  )
} else {
  throw new Error(
    `Root element "${appRootElementId}" for react-dom to render has not been not found`
  )
}
