import storeUtility from '@/store/utility/store.utility'

export default storeUtility.extendConstants('AUTH', {
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_RESPONSE_SUCCESS: 'LOGIN_RESPONSE_SUCCESS',
  LOGIN_RESPONSE_FAILED: 'LOGIN_RESPONSE_FAILED',
})
