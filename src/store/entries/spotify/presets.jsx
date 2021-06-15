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
    jwt: 'BQAg0tgj6ESmXrw7vebi3B0NxAQrhzqEKylNmNv2zfgSUqE_HGDns4QrfhT6qfPHdEkp_uf_ari_NtwK5oRSiRXzimWpdLGl9j-7eqbfQ8j0tmrDwEN1pG3Rhb0ggDO3FaJcIe5lMFIeNy3Fomw_oYYUZvdxUPPL',
    status: options.status.unset,
  },
}

export { options }
export { preset }

export default {
  options,
  preset,
}
