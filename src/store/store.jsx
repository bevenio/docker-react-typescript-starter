import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import { applyReduxExtensionDevtools } from '@/services/devtool-service'
import entries from '@/store/entries'

import { storePersist } from '@/store/utility/store-persist-utility.module'
import { storeShare } from '@/store/utility/store-share-utility.module'

const combinedMiddleware = applyMiddleware(thunkMiddleware, storeShare.middleware)
const store = createStore(entries.reducer, applyReduxExtensionDevtools(combinedMiddleware))

storePersist.extendStore(store)
storeShare.extendStore(store)

export { store }
export { entries }

export default {
  store,
  entries,
}
