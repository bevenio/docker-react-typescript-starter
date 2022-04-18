import { storePersist } from '@/store/utility/store-persist-utility.module'
import type { State } from '@/store/entries/auth/types'

const preset: State = storePersist.restoreEntry('auth') || {
  jwt: null,
  status: 'unset',
}

export { preset }
