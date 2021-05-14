import './chat-list.scss'

import React from 'react'

export const ChatList = (props) => {
  const { children } = props

  return <div className="app-chat-list">{children}</div>
}

export default ChatList
