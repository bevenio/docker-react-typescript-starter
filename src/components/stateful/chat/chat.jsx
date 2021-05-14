/* SCSS */
import './chat.scss'

/* MODULE IMPORTS */
import React from 'react'
import { connect } from 'react-redux'

/* REDUX IMPORTS */
import { entries } from '@/store/redux-store'

/* COMPONENT IMPORTS */
import ChatList from '@/components/stateless/chat-list/chat-list'
import ChatBubble from '@/components/stateless/chat-bubble/chat-bubble'
import ChatInput from '@/components/stateless/chat-input/chat-input'

export const Chat = (props) => {
  const { reduxActions, reduxState } = props

  return (
    <div className="app-chat">
      <ChatList>
        {reduxState.game.currentGuesses.map((guess, index) => {
          const identifier = `app-chat-guess-${index}`
          return (
            <ChatBubble
              key={identifier}
              name={guess.from}
              received={guess.received}
            >
              {guess.content}
            </ChatBubble>
          )
        })}
      </ChatList>
      <ChatInput onSend={reduxActions.sendGuess} />
    </div>
  )
}

/* REDUX CONNECTION */
const mapStateToProps = (state) => ({
  reduxState: {
    game: state.game,
  },
})
const mapDispatchToProps = (dispatch) => ({
  reduxActions: {
    sendGuess: (content) => dispatch(entries.game.actions.sendGuess(content)),
  },
})
export default connect(mapStateToProps, mapDispatchToProps)(Chat)
