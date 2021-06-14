import { restore } from '@/store/utility/store.utility'

const options = {
  status: {
    unset: 'UNSET',
    trying: 'TRYING',
    failed: 'FAILED',
    succeeded: 'SUCCEEDED',
  },
}

const preset = restore.restoreEntry('spotify') || {
  jwt: null,
  status: options.status.unset,
}

export { options }
export { preset }

export default {
  options,
  preset,
}
