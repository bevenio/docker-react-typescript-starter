import { storePersist } from '@/store/utility/store-persist-utility.module'

const options = {
  themes: ['light', 'dark'],
}

const preset = storePersist.restoreEntry('appearance') || {
  title: 'Docker React',
  languageID: 'en',
  theme: options.themes[1],
  lettersize: 'medium',
}

export { options }
export { preset }

export default {
  options,
  preset,
}
