/* APPEARANCE */
import appearanceActions from '@/store/entries/appearance/actions.module'
import appearanceReducer from '@/store/entries/appearance/reducers.module'

/* AUTH */
import authActions from '@/store/entries/auth/actions.module'
import authReducer from '@/store/entries/auth/reducers.module'

/* SPOTIFY */
import spotifyActions from '@/store/entries/spotify/actions.module'
import spotifyReducer from '@/store/entries/spotify/reducers.module'

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
