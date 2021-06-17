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
    jwt: 'BQCe1FnoWAyqkQgGMyB6J8j5ugAPLs98WK2YTBxPSnDCnPKdReCkp6hedg5WsM1DeDex31OWA3q54Ynf3BkJ8Eca1EZsxHG9kM7abbynJiUlDg4Dm7ZSjihGbXCxs1azqzwDA6KblLkmLu3u_ISaCo9KFS148Hdd',
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
