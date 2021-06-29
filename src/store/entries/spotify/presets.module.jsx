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
    jwt: 'BQCd74PnkMHyphj10mNVhyHExP4UOMYHE6wDxRLijzidMgRGzIDNl6hUqfhbZw0T2qfOMtZyd7ISHWw_hIWuU4pZJgxqM06qE5tOFgv-ssy2YFMvqhSUm0bm49cG-laABQCWCf5qp10LrDDIehW_4xmawrTQi6j1',
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
