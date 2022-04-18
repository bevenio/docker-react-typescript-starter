import { constants } from '@/store/entries/settings/constants.module'
import { preset } from '@/store/entries/settings/state.module'
import type { State, Payload } from '@/store/entries/settings/types'

const changeAnimations = (state: State, action: ReduxAction<Payload>): State => ({
  ...state,
  animations: !!action.payload?.animations,
})

const changeLang = (state: State, action: ReduxAction<Payload>): State => ({
  ...state,
  lang: action.payload?.lang || 'en-US',
})

const changeTheme = (state: State, action: ReduxAction<Payload>): State => {
  return {
    ...state,
    theme: action.payload?.theme || 'dark',
  }
  return state
}

const changeLetterSize = (state: State, action: ReduxAction<Payload>): State => ({
  ...state,
  lettersize: action.payload?.lettersize || 'medium',
})

const settingsReducers = (state = preset, action: ReduxAction<Payload> = { type: '', payload: {} }): State => {
  switch (action.type) {
    case constants.CHANGE_ANIMATIONS:
      return changeAnimations(state, action)
    case constants.CHANGE_LANG:
      return changeLang(state, action)
    case constants.CHANGE_THEME:
      return changeTheme(state, action)
    case constants.CHANGE_LETTER_SIZE:
      return changeLetterSize(state, action)
    default:
      return state
  }
}

export { settingsReducers }
