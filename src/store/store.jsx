import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import { applyReduxExtensionDevtools } from '@/services/devtool-service'
import entries from '@/store/entries'

import { Restore } from '@/store/utility/store-utility.module'

const reducers = Object.fromEntries(
  Object.entries(entries).map((entry) => [entry[0], entry[1].reducer])
)

const store = createStore(
  combineReducers(reducers),
  applyReduxExtensionDevtools(applyMiddleware(thunkMiddleware))
)

Restore.extendStore(store)

export { store }
export { entries }

export default {
  store,
  entries,
}
