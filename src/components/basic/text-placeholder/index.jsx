import React from 'react'

/* Styles */
import './text-placeholder.scss'

class TextPlaceholder extends React.Component {
  /* Constant properties */
  CONSTANTS = {
    WEIRD_CHARACTERS: 'ŠŇƍƎƛϪϚɟϑƜƚɅơƩƵϡϟƿϴƾϞǮЄǾȐϖȞȵɃɎŠŇƍƎƛϪϚɟϑƜƚɅơƩƵϡϟƿϴƾϞǮЄǾȐϖȞȵɃɎ'.split(''),
  }

  /* Component implementation */
  generateText = () => {
    const shuffledCharacters = this.CONSTANTS.WEIRD_CHARACTERS.sort(() => 0.5 - Math.random())
    return shuffledCharacters.join('')
  }

  render() {
    return <span className="app-text-placeholder">{this.generateText()}</span>
  }
}

export default TextPlaceholder
