import constants from '@/store/entries/auth/constants.module'
import { preset, options } from '@/store/entries/auth/presets.module'

const requestLogin = (state /* , action */) => ({
  ...state,
  jwt: null,
  status: options.status.trying,
})

const responseLoginSuccess = (state, action) => ({
  ...state,
  jwt: action.payload.jwt,
  status: options.status.succeeded,
})

const responseLoginFailed = (state /* , action */) => ({
  ...state,
  jwt: null,
  status: options.status.failed,
})

const authReducers = (state = preset, action = {}) => {
  switch (action.type) {
    case constants.LOGIN_REQUEST:
      return requestLogin(state, action)
    case constants.LOGIN_RESPONSE_SUCCESS:
      return responseLoginSuccess(state, action)
    case constants.LOGIN_RESPONSE_FAILED:
      return responseLoginFailed(state, action)
    default:
      return state
  }
}

export default authReducers
