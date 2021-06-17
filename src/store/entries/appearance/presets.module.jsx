import { Restore } from '@/store/utility/store-utility.module'

const options = {
  themes: ['light', 'dark'],
}

const preset = Restore.restoreEntry('appearance') || {
  title: 'Docker React',
  languageID: 'en',
  theme: options.themes[0],
  lettersize: 'medium',
}

export { options }
export { preset }

export default {
  options,
  preset,
}
