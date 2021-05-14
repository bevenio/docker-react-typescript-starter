import './user-card.scss'

import React from 'react'
import { generateEmojiByString } from '@/services/emoji-generator-service/emoji-generator-service'

export const UserCard = (props) => {
  const { name = 'secret user', success = false } = props
  const emoji = generateEmojiByString(name)
  return (
    <div className={`app-user-card ${success ? 'app-user-card-success' : ''}`}>
      <div className="app-user-card-emoji">{emoji}</div>
      <div className="app-user-card-name">{name}</div>
    </div>
  )
}

export default UserCard
