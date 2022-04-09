import { constants } from '@/store/entries/settings/constants.module'

const changeAnimations = (payload) => ({
  type: constants.CHANGE_ANIMATIONS,
  payload,
})

const changeLang = (payload) => ({
  type: constants.CHANGE_LANG,
  payload,
})

const changeTheme = (payload) => ({
  type: constants.CHANGE_THEME,
  payload,
})

const changeLetterSize = (payload) => ({
  type: constants.CHANGE_LETTER_SIZE,
  payload,
})

const settingsActions = { changeAnimations, changeLang, changeTheme, changeLetterSize }

export { settingsActions }
