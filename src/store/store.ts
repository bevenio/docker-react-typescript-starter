import { createStore, applyMiddleware, Dispatch } from 'redux'
import thunkMiddleware from 'redux-thunk'

import { applyReduxExtensionDevtools } from '@/services/devtool-service'
import { actions, rootReducer } from '@/store/entries'

import { storePersist } from '@/store/utility/store-persist-utility.module'
import { storeShare } from '@/store/utility/store-share-utility.module'

/* Extend store with custom middlewares */
const combinedMiddleware = applyMiddleware(thunkMiddleware, storeShare.middleware)

/* Creating store */
const store = createStore(rootReducer, applyReduxExtensionDevtools(combinedMiddleware))

declare global {
  type ReduxDispatch = Dispatch
  type ReduxStore = typeof store
  type ReduxState = ReturnType<typeof rootReducer>
  type ReduxStateKey = keyof ReduxState
}

/* Extend store with custom extensions */
storePersist.extendStore(store)
storeShare.extendStore(store)

export { store, actions }
