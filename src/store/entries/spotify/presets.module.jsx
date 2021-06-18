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
    jwt: 'BQCQUOSWOWNUxqc5d7buMI6x-eUmQ1atYeYKw1LCm9tvektogHSGdje62gqI50TFYwPX2mCQeyn3URHQsZIATuw7cnjNh4Y5cdF9pP6hH3dZwjz4SvLU2gCBCbKeIIcL81gPSW3ftd-QdfXrbagb3yGcgcxwoAm6',
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
