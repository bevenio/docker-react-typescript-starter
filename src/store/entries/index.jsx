import { combineReducers } from 'redux'

/* SETTINGS */
import settingsActions from '@/store/entries/settings/actions.module'
import settingsReducer from '@/store/entries/settings/reducers.module'

/* AUTH */
import authActions from '@/store/entries/auth/actions.module'
import authReducer from '@/store/entries/auth/reducers.module'

/* SPOTIFY */
import spotifyActions from '@/store/entries/spotify/actions.module'
import spotifyReducer from '@/store/entries/spotify/reducers.module'

/* COMBINED ACTIONS */
const actions = {
  auth: authActions,
  settings: settingsActions,
  spotify: spotifyActions,
}

/* COMBINED REDUCERS */
const reducers = {
  auth: authReducer,
  settings: settingsReducer,
  spotify: spotifyReducer,
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
