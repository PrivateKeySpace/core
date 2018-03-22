/* @flow */

const { randomBytes: generateRandomBytes } = require('crypto')

const DEFAULT_CHARACTER_POOL: string = 'abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789'

function generateRandomString (length: number = 32, characterPool: string = DEFAULT_CHARACTER_POOL): string {
  const randomBuffer: Buffer = generateRandomBytes(length)
  const resultingCharacters: Array<string> = new Array(length)
  const characterPoolLength: number = characterPool.length

  for (let index: number = 0; index < length; index++) {
    resultingCharacters[index] = (characterPool[randomBuffer[index] % characterPoolLength])
  }

  return resultingCharacters.join('')
}

module.exports = generateRandomString
