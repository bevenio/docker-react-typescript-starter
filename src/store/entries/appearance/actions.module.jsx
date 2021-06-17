import constants from '@/store/entries/appearance/constants.module'

const changeTheme = (payload) => ({
  type: constants.CHANGE_THEME,
  payload,
})

const changeLetterSize = (payload) => ({
  type: constants.CHANGE_LETTER_SIZE,
  payload,
})

export { changeTheme }
export { changeLetterSize }

export default {
  changeTheme,
  changeLetterSize,
}
