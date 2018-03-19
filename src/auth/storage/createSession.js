const { generateRandomString } = require('../../common/lib/crypto')

const SESSION_ID_LENGTH = 64

function createSession (challenge) {
  const sessionId = generateRandomString(SESSION_ID_LENGTH)
  // TODO
  return sessionId
}

module.exports = createSession
