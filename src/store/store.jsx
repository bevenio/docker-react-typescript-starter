import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import entries from '@/store/entries/entry-bundle'

import { applyReduxExtensionDevtools } from '@/services/devtool-service'
import { restore } from '@/store/utility/store.utility'

const reducers = Object.fromEntries(
  Object.entries(entries).map((entry) => [entry[0], entry[1].reducer])
)

const store = createStore(
  combineReducers(reducers),
  applyReduxExtensionDevtools(applyMiddleware(thunkMiddleware))
)

restore.extendStore(store)

export { store }
export { entries }

export default {
  store,
  entries,
}
