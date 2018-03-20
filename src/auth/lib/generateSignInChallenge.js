const { randomBytes: generateRandomBytes } = require('crypto')
const { CHALLENGE_HIDDEN_LENGTH } = require('../constants')

function generateSignInChallenge () {
  const challengeVisible = (new Date()).toUTCString()
  const challengeHidden = generateRandomBytes(CHALLENGE_HIDDEN_LENGTH).toString('hex')

  return [challengeVisible, challengeHidden]
}

module.exports = generateSignInChallenge
