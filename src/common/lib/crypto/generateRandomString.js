const { randomBytes: getRandomBytes } = require('crypto')

const DEFAULT_CHARACTER_POOL = 'abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789'

function generateRandomString (length = 32, characterPool = DEFAULT_CHARACTER_POOL) {
  const randomBytes = getRandomBytes(length)
  const resultingCharacters = new Array(length)
  const characterPoolLength = characterPool.length

  for (let index = 0; index < length; index++) {
    resultingCharacters[index] = (characterPool[randomBytes[index] % characterPoolLength])
  }

  return resultingCharacters.join('')
}

module.exports = generateRandomString
