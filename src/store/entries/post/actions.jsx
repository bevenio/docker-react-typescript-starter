import constants from '@/store/entries/post/constants'
import api from '@/store/utility/rest-api'

const responsePosts = (payload) => ({
  type: constants.RESPONSE_POSTS,
  payload,
})

const requestPosts = () => (dispatch, getStore) => {
  dispatch({ type: constants.REQUEST_POSTS })
  const updateCounter = getStore().post.updateCounter + 1

  api.get('/posts').then((response) => {
    dispatch(
      responsePosts({
        posts: response.data,
        updateCounter,
      })
    )
  })
}

export { requestPosts }
export { responsePosts }

export default {
  requestPosts,
  responsePosts,
}
