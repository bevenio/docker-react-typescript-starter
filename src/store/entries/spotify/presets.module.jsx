import { Restore } from '@/store/utility/store-utility.module'

const options = {
  status: {
    unset: 'UNSET',
    trying: 'TRYING',
    failed: 'FAILED',
    succeeded: 'SUCCEEDED',
  },
}

const preset = Restore.restoreEntry('spotify') || {
  auth: {
    jwt: 'BQBIvqvIYrc56No9pbt3PbIAEoUmaXhm-F8L0vErcdjWd0OqkN5lk4ziQj6dW6AsILIrZmMwO4wN4JSP7o1TgqZ-_ArffS4-RSalDbTwDMAXB__CgJG7v2odphvE97ytaBd-3Jn1RvPnmH1U8LK0k2UgWBrzQFoq',
    status: options.status.unset,
  },
  player: {
    deviceId: '',
    trackId: '',
  },
}

export { options }
export { preset }

export default {
  options,
  preset,
}
