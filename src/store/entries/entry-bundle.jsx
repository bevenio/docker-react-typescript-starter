/* APPEARANCE */
import appearanceActions from '@/store/entries/appearance/actions'
import appearanceReducer from '@/store/entries/appearance/reducers'

/* AUTH */
import authActions from '@/store/entries/auth/actions'
import authReducer from '@/store/entries/auth/reducers'

/* SPOTIFY */
import spotifyActions from '@/store/entries/spotify/actions'
import spotifyReducer from '@/store/entries/spotify/reducers'

export default {
  appearance: {
    actions: appearanceActions,
    reducer: appearanceReducer,
  },
  auth: {
    actions: authActions,
    reducer: authReducer,
  },
  spotify: {
    actions: spotifyActions,
    reducer: spotifyReducer,
  },
}
