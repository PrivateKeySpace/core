/* @flow */

const { randomBytes: generateRandomBytes } = require('crypto')

const MAX_RANDOM_INTEGER: number = Number.parseInt((Buffer.from([255, 255, 255, 255])).toString('hex'), 16)

function getRandomInteger (min: number = 0, max: number = MAX_RANDOM_INTEGER): number {
  const randomBuffer: Buffer = generateRandomBytes(4)
  const randomInteger: number = Number.parseInt(randomBuffer.toString('hex'), 16)
  const randomFraction: number = (randomInteger / MAX_RANDOM_INTEGER)

  return (Math.floor(randomFraction * (max - min + 1)) + min)
}

module.exports = getRandomInteger
