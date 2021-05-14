/* APPEARANCE */
import appearanceActions from '@/store/entries/appearance/actions'
import appearanceReducer from '@/store/entries/appearance/reducer'

/* GAME */
import gameActions from '@/store/entries/game/actions'
import gameReducer from '@/store/entries/game/reducer'

/* POST */
import postActions from '@/store/entries/post/actions'
import postReducer from '@/store/entries/post/reducer'

export default {
  appearance: {
    actions: appearanceActions,
    reducer: appearanceReducer,
  },
  game: {
    actions: gameActions,
    reducer: gameReducer,
  },
  post: {
    actions: postActions,
    reducer: postReducer,
  },
}
