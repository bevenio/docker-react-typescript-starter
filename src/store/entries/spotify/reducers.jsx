import constants from '@/store/entries/spotify/constants'
import { preset, options } from '@/store/entries/spotify/presets'

const logoutFromSpotify = (state /* , action */) => ({
  ...state,
  auth: {
    jwt: null,
    status: options.status.unset,
  },
})

const selectTrack = (state, action) => ({
  ...state,
  player: {
    ...state.player,
    trackId: action.payload.trackId || null,
  },
})

const spotifyReducers = (state = preset, action) => {
  switch (action.type) {
    case constants.REDIRECT_TO_SPOTIFY:
      return state
    case constants.LOGOUT_FROM_SPOTIFY:
      return logoutFromSpotify(state, action)
    case constants.SELECT_TRACK:
      return selectTrack(state, action)
    default:
      return state
  }
}

export default spotifyReducers
