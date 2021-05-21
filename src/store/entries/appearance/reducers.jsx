import constants from '@/store/entries/appearance/constants'
import { preset, options } from '@/store/entries/appearance/presets'

const changeTheme = (state, action) => {
  if (options.themes.includes(action.payload)) {
    return {
      ...state,
      theme: action.payload,
    }
  }
  return state
}

const changeLetterSize = (state, action) => ({
  ...state,
  lettersize: action.payload,
})

const appearanceReducers = (state = preset, action) => {
  switch (action.type) {
    case constants.CHANGE_THEME:
      return changeTheme(state, action)
    case constants.CHANGE_LETTER_SIZE:
      return changeLetterSize(state, action)
    default:
      return state
  }
}

export default appearanceReducers