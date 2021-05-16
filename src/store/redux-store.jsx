import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import entries from '@/store/entries/entry-bundle'

import { applyReduxExtensionDevtools } from '@/services/devtool-service/devtool-service'
import { extendStoreWithLocalStorage } from '@/store/utility/utility'

const reducers = Object.fromEntries(
  Object.entries(entries).map((entry) => [entry[0], entry[1].reducer])
)

const store = createStore(
  combineReducers(reducers),
  applyReduxExtensionDevtools(applyMiddleware(thunkMiddleware))
)

extendStoreWithLocalStorage(store)

export { store }
export { entries }

export default {
  store,
  entries,
}
