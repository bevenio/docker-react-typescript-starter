import '@/assets/scss/index.scss'

import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import { store } from '@/store/store'
import { AppRouter } from '@/router/router'

const appRootElementId = 'app'
const appRootElement = document.getElementById(appRootElementId)

if (appRootElement !== null) {
  createRoot(appRootElement).render(
    <Provider store={store}>
      <AppRouter />
    </Provider>
  )
} else {
  throw new Error(`Root element "${appRootElementId}" for react-dom to render has not been not found`)
}
