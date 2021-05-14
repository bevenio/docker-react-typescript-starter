import constants from '@/store/entries/post/constants'
import { preset /* , options */ } from '@/store/entries/post/preset'

const requestPosts = (state /* , action */) => state

const responsePosts = (state, action) => ({
  ...state,
  lastUpdate: new Date(),
  posts: action.payload.posts,
  updateCounter: action.payload.updateCounter,
})

const postReducers = (state = preset, action) => {
  switch (action.type) {
    case constants.REQUEST_POSTS:
      return requestPosts(state, action)
    case constants.RESPONSE_POSTS:
      return responsePosts(state, action)
    default:
      return state
  }
}

export default postReducers
