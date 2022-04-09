import { combineReducers } from 'redux'

/* SETTINGS */
import { settingsActions } from '@/store/entries/settings/actions.module'
import { settingsReducers } from '@/store/entries/settings/reducers.module'

/* AUTH */
import { authActions } from '@/store/entries/auth/actions.module'
import { authReducers } from '@/store/entries/auth/reducers.module'

/* COMBINED ACTIONS */
const actions = {
  auth: authActions,
  settings: settingsActions,
}

/* COMBINED REDUCERS */
const reducers = {
  auth: authReducers,
  settings: settingsReducers,
}

/* ROOT ACTION / REDUCER */
const ROOT_STATE_INIT = 'INIT'

const reducer = (state, action) => {
  if (action.type === ROOT_STATE_INIT) {
    return action.payload
  }
  return combineReducers(reducers)(state, action)
}

export { actions, reducer }
