import axios from 'axios'

import { store } from '@/store/store'

import constants from '@/store/entries/spotify/constants.module'

const CONSTANTS = {
  AUTH_URL: 'https://accounts.spotify.com/',
  API_URL: 'https://api.spotify.com/v1/',
  CLIENT_ID: '4aaa1fa777ed46739215f1697adc780a',
  RESPONSE_TYPE: 'token',
  REDIRECT_URI: 'http://178.11.12.174:8080/callback/',
  STATE: 'spotify',
  SCOPE: 'user-read-private user-read-email',
}

/* Spotify Api Instance */

const spotifyApi = axios.create({
  baseURL: CONSTANTS.API_URL,
  timeout: 1000,
})

spotifyApi.interceptors.request.use((config) => {
  const token = store.getState().spotify.auth.jwt

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

const onSpotifyApiRequestFailed = (error) => {
  if (error.response) {
    if (error.response.status === 401) {
      store.dispatch({ type: constants.LOGOUT_FROM_SPOTIFY })
    }
  }
}

/* User triggered actions */

const redirectToSpotify = (/* payload */) => (dispatch /* , getStore */) => {
  dispatch({ type: constants.REDIRECT_TO_SPOTIFY })

  const redirectUrl = new URL(CONSTANTS.AUTH_URL)
  redirectUrl.searchParams.set('client_id', CONSTANTS.CLIENT_ID)
  redirectUrl.searchParams.set('redirect_uri', CONSTANTS.REDIRECT_URI)
  redirectUrl.searchParams.set('scope', CONSTANTS.SCOPE)
  redirectUrl.searchParams.set('response_type', CONSTANTS.RESPONSE_TYPE)
  redirectUrl.searchParams.set('state', CONSTANTS.STATE)

  window.location.replace(redirectUrl)
}

const selectDevice = (payload) => ({
  type: constants.SELECT_DEVICE,
  payload,
})

const selectTrack = (payload) => (dispatch, getStore) => {
  dispatch({ type: constants.SELECT_TRACK, payload })

  const { deviceId } = getStore().spotify.player
  const { trackId } = payload

  const params = new URLSearchParams([['device_id', deviceId]])

  spotifyApi
    .put(`/me/player/play`, { uris: [`spotify:track:${trackId}`] }, { params })
    .catch(onSpotifyApiRequestFailed)
}

export { redirectToSpotify }
export { selectDevice }
export { selectTrack }

export default {
  redirectToSpotify,
  selectDevice,
  selectTrack,
}
