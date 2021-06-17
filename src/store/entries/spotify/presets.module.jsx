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
    jwt: 'BQCWfZeaD0muTH5iSG6BlAOMsGhrL73JgozzucCO3KslZlM_bJylyZ86gMVWEkYyohjctrQ1xA0Ji68zMjr2zAFxaYwnzyaeW8KAW-vGrhbYQqXkm-Y50j072M83CuLufMN709IPk-BoYFNbRb368I-W5fnEPexd',
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
