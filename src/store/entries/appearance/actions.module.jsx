import constants from '@/store/entries/appearance/constants.module'

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

export { changeLang }
export { changeTheme }
export { changeLetterSize }

export default {
  changeLang,
  changeTheme,
  changeLetterSize,
}
