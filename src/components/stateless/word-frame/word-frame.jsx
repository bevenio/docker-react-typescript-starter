import './word-frame.scss'

import React from 'react'

export const WordFrame = (props) => {
  const { characters = [] } = props
  const elementContent = characters.map((character, index) => {
    const identifier = `app-word-character-${index}`
    if (character === '_') {
      return (
        <div
          key={identifier}
          className="app-word-character-frame app-word-character-frame-space"
        />
      )
    }
    return (
      <div key={identifier} className="app-word-character-frame">
        {character !== null ? String(character)[0].toUpperCase() : ''}
      </div>
    )
  })
  return <div className="app-word-frame">{elementContent}</div>
}

export default WordFrame
