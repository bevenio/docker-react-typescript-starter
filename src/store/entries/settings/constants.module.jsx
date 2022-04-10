import { extendConstants } from '@/store/utility/store-general-utility.module'

const key = 'settings'

const constants = extendConstants(key, {
  CHANGE_ANIMATIONS: 'CHANGE_ANIMATIONS',
  CHANGE_LANG: 'CHANGE_LANG',
  CHANGE_THEME: 'CHANGE_THEME',
  CHANGE_LETTER_SIZE: 'CHANGE_LETTER_SIZE',
})

export { key, constants }
