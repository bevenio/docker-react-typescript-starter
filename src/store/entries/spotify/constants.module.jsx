import storeUtility from '@/store/utility/store-utility.module'

export default storeUtility.extendConstants('SPOTIFY', {
  REDIRECT_TO_SPOTIFY: 'REDIRECT_TO_SPOTIFY',
  LOGOUT_FROM_SPOTIFY: 'LOGOUT_FROM_SPOTIFY',
  SELECT_TRACK: 'SELECT_TRACK',
  SELECT_DEVICE: 'SELECT_DEVICE',
})
