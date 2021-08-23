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
    jwt: 'BQANXjyjRtSj9bVSoeK5uOypDMiWsiKQQfZh-b6mdzbKqFY-ZMZ1ILNdF7nl3cgBJnBi7NuO-kKagumUtiO5VtTkPBCPQx9dCn00-VOhJBKhMruiSbwSxyxcu5WLzsqBA5KmeRfY-xUAr3O0uXolv0JUXS6ef0sx',
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
