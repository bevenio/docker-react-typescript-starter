import '@/assets/scss/index.scss'

import { hot } from 'react-hot-loader/root'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { store } from '@/store/store'
import { AppRouter } from '@/router/router'

const appRootElementId = 'app'
const appRootElement = document.getElementById(appRootElementId)
const AppReactRootElement = hot(AppRouter)

if (appRootElement !== null) {
  ReactDOM.render(
    <Provider store={store}>
      <AppReactRootElement />
    </Provider>,
    appRootElement
  )
} else {
  throw new Error(`Root element "${appRootElementId}" for react-dom to render has not been not found`)
}
