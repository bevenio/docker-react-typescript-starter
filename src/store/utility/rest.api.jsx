import axios from 'axios'

import settings from '@/settings'

export default axios.create({
  baseURL: settings.api.rest,
  timeout: 1000,
})
