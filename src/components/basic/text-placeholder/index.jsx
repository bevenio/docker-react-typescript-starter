import React from 'react'

/* Styles */
import './text-placeholder.scss'

const TextPlaceholder = function () {
  /* Constant properties */
  CONSTANTS = {
    WEIRD_CHARACTERS: 'ŠŇƍƎƛϪϚɟϑƜƚɅơƩƵϡϟƿϴƾϞǮЄǾȐϖȞȵɃɎŠŇƍƎƛϪϚɟϑƜƚɅơƩƵϡϟƿϴƾϞǮЄǾȐϖȞȵɃɎ'.split(''),
  }

  /* Component implementation */
  generateWeirdText = () => {
    return CONSTANTS.WEIRD_CHARACTERS.sort(() => 0.5 - Math.random()).join('')
  }

  return <span className="app-text-placeholder">{generateWeirdText()}</span>
}

export default TextPlaceholder
