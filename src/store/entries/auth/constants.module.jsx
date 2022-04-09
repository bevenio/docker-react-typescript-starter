import { extendConstants } from '@/store/utility/store-general-utility.module'

const constants = extendConstants('AUTH', {
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_RESPONSE_SUCCESS: 'LOGIN_RESPONSE_SUCCESS',
  LOGIN_RESPONSE_FAILED: 'LOGIN_RESPONSE_FAILED',
})

export { constants }
