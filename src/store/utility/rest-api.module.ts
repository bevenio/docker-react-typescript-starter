import axios from 'axios'

import { settings } from '@/settings'
import { store } from '@/store/store'

const axiosInstance = axios.create({
  baseURL: settings.api.rest,
  timeout: 1000,
})

axiosInstance.interceptors.request.use((config) => {
  const token = store.getState().auth.jwt

  if (token) {
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      },
    }
  }

  return config
})

export { axiosInstance as api }
