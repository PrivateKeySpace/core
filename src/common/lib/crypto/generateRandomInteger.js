const { randomBytes: getRandomBytes } = require('crypto')

const MAX_RANDOM_INTEGER = Number.parseInt((Buffer.from([255, 255, 255, 255])).toString('hex'), 16)

function getRandomInteger (min = 0, max = MAX_RANDOM_INTEGER) {
  const randomBytes = getRandomBytes(4)
  const randomInteger = Number.parseInt(randomBytes.toString('hex'), 16)
  const randomFraction = (randomInteger / MAX_RANDOM_INTEGER)

  return (Math.floor(randomFraction * (max - min + 1)) + min)
}

module.exports = getRandomInteger
