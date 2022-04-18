import { constants } from '@/store/entries/auth/constants.module'
import { preset } from '@/store/entries/auth/state.module'
import type { State, Payload } from '@/store/entries/auth/types'

const requestLogin = (state: State): State => ({
  ...state,
  jwt: null,
  status: 'trying',
})

const responseLoginSuccess = (state: State, action: ReduxAction<Payload>): State => ({
  ...state,
  jwt: action.payload?.jwt || null,
  status: 'succeeded',
})

const responseLoginFailed = (state: State): State => ({
  ...state,
  jwt: null,
  status: 'failed',
})

const authReducers = (state = preset, action: ReduxAction<Payload> = { type: '', payload: {} }): State => {
  switch (action.type) {
    case constants.LOGIN_REQUEST:
      return requestLogin(state)
    case constants.LOGIN_RESPONSE_SUCCESS:
      return responseLoginSuccess(state, action)
    case constants.LOGIN_RESPONSE_FAILED:
      return responseLoginFailed(state)
    default:
      return state
  }
}

export { authReducers }
