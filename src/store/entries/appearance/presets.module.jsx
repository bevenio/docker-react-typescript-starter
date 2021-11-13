import { storePersist } from '@/store/utility/store-persist-utility.module'

const options = {
  themes: ['light', 'dark'],
}

const preset = storePersist.restoreEntry('appearance') || {
  title: 'Docker React',
  lettersize: 'medium',
  lang: 'en-US',
  theme: options.themes[1],
}

export { options }
export { preset }

export default {
  options,
  preset,
}
