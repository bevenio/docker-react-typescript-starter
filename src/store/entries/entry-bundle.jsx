/* APPEARANCE */
import appearanceActions from '@/store/entries/appearance/actions'
import appearanceReducer from '@/store/entries/appearance/reducers'

/* USER */
import authActions from '@/store/entries/auth/actions'
import authReducer from '@/store/entries/auth/reducers'

export default {
  appearance: {
    actions: appearanceActions,
    reducer: appearanceReducer,
  },
  auth: {
    actions: authActions,
    reducer: authReducer,
  },
}
