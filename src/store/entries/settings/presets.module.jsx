import { storePersist } from '@/store/utility/store-persist-utility.module'

const options = {
  themes: ['light', 'dark'],
}

const preset = storePersist.restoreEntry('settings') || {
  title: 'Bev Co.',
  animations: true,
  lang: 'en-US',
  lettersize: 'medium',
  theme: options.themes[1],
}

export { options, preset }
