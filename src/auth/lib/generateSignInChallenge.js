/* @flow */

const { randomBytes: generateRandomBytes } = require('crypto')
const { CHALLENGE_HIDDEN_LENGTH } = require('../constants')

function generateSignInChallenge (): [string, string] {
  const challengeVisual: string = (new Date()).toUTCString()
  const challengeHidden: string = generateRandomBytes(CHALLENGE_HIDDEN_LENGTH).toString('hex')

  return [challengeVisual, challengeHidden]
}

module.exports = generateSignInChallenge
