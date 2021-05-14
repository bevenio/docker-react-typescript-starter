import constants from '@/store/entries/game/constants'
import socket from '@/store/utility/socket-api'
import { store } from '@/store/redux-store'

/* LOCALLY TRIGGERED ACTIONS */
const receiveJoinedGame = (payload) => ({
  type: constants.RECEIVE_JOINED_GAME,
  payload,
})

const sendJoinGame = () => (dispatch) => {
  dispatch({ type: constants.SEND_JOIN_GAME })
  socket.sendAction('join', { nothing: true })
  socket.onActionOnce('joined', (options) => {
    dispatch(receiveJoinedGame(options))
  })
}

const sendGuess = (content) => (dispatch /* , getStore */) => {
  socket.sendAction('guess', {
    from: 'random',
    content,
  })
  dispatch({ type: constants.SEND_GUESS })
}

const receiveGuess = (payload) => ({
  type: constants.RECEIVE_GUESS,
  payload,
})

/* REMOTELY TRIGGERED ACTIONS */
socket.onAction('guess', (guess) => {
  store.dispatch(receiveGuess(guess))
})

export { sendJoinGame }
export { sendGuess }

export default {
  sendJoinGame,
  sendGuess,
}
