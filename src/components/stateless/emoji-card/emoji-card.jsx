import './emoji-card.scss'

import React from 'react'

export const EmojiCard = (props) => {
  const { content = '', hoverable = false, clicked = null } = props
  return (
    <button
      type="button"
      className={`app-emoji-card ${hoverable ? 'app-emoji-card-alt' : ''}`}
      onClick={clicked || undefined}
    >
      {content}
    </button>
  )
}

export default EmojiCard
