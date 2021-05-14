import storeUtility from '@/store/utility/utility'

export default storeUtility.extendConstants('GAME', {
  SEND_JOIN_GAME: 'SEND_JOIN_GAME',
  RECEIVE_JOINED_GAME: 'RECEIVE_JOINED_GAME',
  SEND_GUESS: 'SEND_GUESS',
  RECEIVE_GUESS: 'RECEIVE_GUESS',
})
