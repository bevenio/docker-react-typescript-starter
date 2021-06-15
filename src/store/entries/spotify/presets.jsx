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
  auth: {
    jwt: 'BQDShOz90yiN98hSRe6r9b1mXEC6KSNXygRQi906XZBQotwxZbyABM5FjJFKLD91ha9nWMXatoUL-m687KlurZXxxDJOep6uacgDR9OTFz8yrNcCCoT1oNlihwShQnKkompfYj9_wEZmLs-vZCdlJEzUSr3ucGsQ',
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
