import { combineReducers } from 'redux'

/* SETTINGS */
import { key as settingsKey } from '@/store/entries/settings/constants.module'
import { settingsActions } from '@/store/entries/settings/actions.module'
import { settingsReducers } from '@/store/entries/settings/reducers.module'

/* AUTH */
import { key as authKey } from '@/store/entries/auth/constants.module'
import { authActions } from '@/store/entries/auth/actions.module'
import { authReducers } from '@/store/entries/auth/reducers.module'

/* COMBINED ACTIONS */
const actions = {
  [authKey]: authActions,
  [settingsKey]: settingsActions,
}

/* COMBINED REDUCERS */
const reducers = {
  auth: authReducers,
  settings: settingsReducers,
}

/* ROOT ACTION / REDUCER */
const ROOT_STATE_INIT = 'INIT'

const rootReducer = (state, action) => {
  if (action.type === ROOT_STATE_INIT) {
    return action.payload
  }
  return combineReducers(reducers)(state, action)
}

export { actions, rootReducer }
