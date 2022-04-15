/* Styles */
import './text-placeholder.scss'

const TextPlaceholder: React.FC = function () {
  /* Constant properties */
  const CONSTANTS: { WEIRD_CHARACTERS: string[] } = {
    WEIRD_CHARACTERS: 'ŠŇƍƎƛϪϚɟϑƜƚɅơƩƵϡϟƿϴƾϞǮЄǾȐϖȞȵɃɎŠŇƍƎƛϪϚɟϑƜƚɅơƩƵϡϟƿϴƾϞǮЄǾȐϖȞȵɃɎ'.split(''),
  }

  /* Component implementation */
  const generateWeirdText = (): string => CONSTANTS.WEIRD_CHARACTERS.sort(() => 0.5 - Math.random()).join('')

  return <span className="app-text-placeholder">{generateWeirdText()}</span>
}

export { TextPlaceholder }
