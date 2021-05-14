import constants from '@/store/entries/game/constants'
import { preset /* , options */ } from '@/store/entries/game/preset'

const sendJoinGame = (state /* , action */) => state

const receiveJoinedGame = (state, action) => ({
  ...state,
  currentGame: { ...action.payload },
})

const sendGuess = (state /* , action */) => state

const receiveGuess = (state, action) => ({
  ...state,
  currentGuesses: [...state.currentGuesses, action.payload],
})

const gameReducers = (state = preset, action) => {
  switch (action.type) {
    case constants.SEND_JOIN_GAME:
      return sendJoinGame(state, action)
    case constants.RECEIVE_JOINED_GAME:
      return receiveJoinedGame(state, action)
    case constants.SEND_GUESS:
      return sendGuess(state, action)
    case constants.RECEIVE_GUESS:
      return receiveGuess(state, action)
    default:
      return state
  }
}

export default gameReducers
