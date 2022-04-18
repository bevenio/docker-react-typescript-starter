/* eslint-disable @typescript-eslint/no-explicit-any */
import { combineReducers } from 'redux'

/* SETTINGS */
import { settingsActions } from '@/store/entries/settings/actions.module'
import { settingsReducers } from '@/store/entries/settings/reducers.module'
import type { State as SettingsState } from '@/store/entries/settings/types'

/* AUTH */
import { authActions } from '@/store/entries/auth/actions.module'
import { authReducers } from '@/store/entries/auth/reducers.module'
import type { State as AuthState } from '@/store/entries/auth/types'

/* COMBINED INTERFACE */
interface ReduxState {
  auth: AuthState
  settings: SettingsState
}

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

const rootReducer = (state: ReduxState | undefined, action: ReduxAction<any>) => {
  if (action.type === ROOT_STATE_INIT) {
    return action.payload
  }
  return combineReducers(reducers)(state, action)
}

export { actions, rootReducer }
