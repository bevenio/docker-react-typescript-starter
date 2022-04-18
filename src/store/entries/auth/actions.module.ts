import { constants } from '@/store/entries/auth/constants.module'
import { api } from '@/store/utility/rest-api.module'
import type { Payload } from '@/store/entries/auth/types'

const responseLoginSuccess = (payload: Payload) => ({
  type: constants.LOGIN_RESPONSE_SUCCESS,
  payload,
})

const responseLoginFailed = () => ({
  type: constants.LOGIN_RESPONSE_FAILED,
})

const requestLogin = (payload: Payload) => (dispatch: ReduxDispatch /* , getStore */) => {
  dispatch({ type: constants.LOGIN_REQUEST })

  api
    .post('/auth/local', {
      identifier: payload.identifier,
      password: payload.password,
    })
    .then((response) => {
      dispatch(responseLoginSuccess(response.data))
    })
    .catch((error) => {
      dispatch(responseLoginFailed())
      throw new Error(error)
    })
}

const authActions = {
  requestLogin,
}

export { authActions }
