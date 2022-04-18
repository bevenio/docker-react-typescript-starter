import { constants } from '@/store/entries/settings/constants.module'
import type { Payload } from '@/store/entries/settings/types'

const changeAnimations = (payload: Payload) => ({
  type: constants.CHANGE_ANIMATIONS,
  payload,
})

const changeLang = (payload: Payload) => ({
  type: constants.CHANGE_LANG,
  payload,
})

const changeTheme = (payload: Payload) => ({
  type: constants.CHANGE_THEME,
  payload,
})

const changeLetterSize = (payload: Payload) => ({
  type: constants.CHANGE_LETTER_SIZE,
  payload,
})

const settingsActions = { changeAnimations, changeLang, changeTheme, changeLetterSize }

export { settingsActions }
