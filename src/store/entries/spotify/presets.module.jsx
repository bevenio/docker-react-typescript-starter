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
    jwt: 'BQDBwhljzzOzNLpQEqOXi6aXNWVgIfPNpDj5yEmilVUWsvrFjmZZiAPE_8E7DwQWUjsuGR8PbLF7_7IACWOdcj9wwyoUuEJ2JP0TYmj66DzeffZlhLy2_OKa70WiR8JuRVAWNOc34nar_5NewwYk8pxP4qLFild4',
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
