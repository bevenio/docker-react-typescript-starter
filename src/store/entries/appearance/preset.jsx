import { retrieveStoreLocalStorageEntry } from '@/store/utility/utility'

const options = {
  themes: ['light', 'dark'],
}

const preset = retrieveStoreLocalStorageEntry('appearance') || {
  title: 'Emoji Game',
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
