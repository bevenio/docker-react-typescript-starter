import './chat-bubble.scss'

import React from 'react'

export const ChatBubble = (props) => {
  const { received = false, name = 'unknown', children } = props

  return (
    <div
      className={`app-chat-bubble ${
        received ? 'app-chat-bubble-received' : ''
      }`}
    >
      {children}
      <span className="app-chat-bubble-name">{name}</span>
    </div>
  )
}

export default ChatBubble
