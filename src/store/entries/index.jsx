import { combineReducers } from 'redux'

/* SETTINGS */
import settingsActions from '@/store/entries/settings/actions.module'
import settingsReducer from '@/store/entries/settings/reducers.module'

/* AUTH */
import authActions from '@/store/entries/auth/actions.module'
import authReducer from '@/store/entries/auth/reducers.module'

/* COMBINED ACTIONS */
const actions = {
  auth: authActions,
  settings: settingsActions,
}

/* COMBINED REDUCERS */
const reducers = {
  auth: authReducer,
  settings: settingsReducer,
}

/* ROOT ACTION / REDUCER */
const ROOT_STATE_INIT = 'INIT'

const reducer = (state, action) => {
  if (action.type === ROOT_STATE_INIT) {
    return action.payload
  }
  return combineReducers(reducers)(state, action)
}

export { actions }
export { reducer }
export default { actions, reducer }
