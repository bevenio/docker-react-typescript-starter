import { storePersist } from '@/store/utility/store-persist-utility.module'
import type { State } from '@/store/entries/settings/types'

const preset: State = storePersist.restoreEntry('settings') || {
  title: 'Bev Co.',
  animations: true,
  lang: 'en-US',
  lettersize: 'medium',
  theme: 'dark',
}

export { preset }
