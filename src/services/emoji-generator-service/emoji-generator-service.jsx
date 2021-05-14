const generateEmojiByString = (value) => {
  const lowerCaseValue = String(value).toLowerCase()
  const characterList = 'abcdefghijklmnopqrstuvwxyz'
  const allowedEmoji = ['😊', '👻', '👽', '👽', '🐉']

  let numericalValue = 0
  lowerCaseValue.split('').forEach((character) => {
    if (characterList.includes(character)) {
      numericalValue += characterList.indexOf(character)
    }
  })

  return allowedEmoji[numericalValue % allowedEmoji.length]
}

export { generateEmojiByString }

export default {
  generateEmojiByString,
}
