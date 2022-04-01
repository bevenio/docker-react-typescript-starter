import { storePersist } from '@/store/utility/store-persist-utility.module'

const options = {
  status: {
    unset: 'unset',
    trying: 'trying',
    failed: 'failed',
    succeeded: 'succeeded',
  },
}

const preset = storePersist.restoreEntry('auth') || {
  jwt: null,
  status: options.status.unset,
}

export { options }
export { preset }

export default {
  options,
  preset,
}
