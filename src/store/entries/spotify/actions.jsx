import constants from '@/store/entries/spotify/constants'
// import axios from 'axios'

const CONSTANTS = {
  AUTH_URL: 'https://accounts.spotify.com/',
  API_URL: 'https://api.spotify.com/v1/me',
  CLIENT_ID: '4aaa1fa777ed46739215f1697adc780a',
  RESPONSE_TYPE: 'token',
  REDIRECT_URI: 'http://178.11.12.174:8080/',
  STATE: 'default',
  SCOPE: 'user-read-private user-read-email',
}

// const spotifyApi = axios.create({
//   baseURL: CONSTANTS.API_URL,
//   timeout: 1000,
// })

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

export { redirectToSpotify }

export default {
  redirectToSpotify,
}
