const { writeResponse } = require('../../common/lib')
const { generateRandomString } = require('../../common/lib/crypto')
const { SESSION_KEY_LENGTH } = require('../constants')
const { generateSignInChallenge } = require('../lib')
const { createSignInSession } = require('../storage')

async function handleSignInSessionStart (ctx) {
  const challenge = generateSignInChallenge()

  const sessionKey = generateRandomString(SESSION_KEY_LENGTH)
  const sessionData = { key: sessionKey, challenge }

  try {
    await createSignInSession(sessionData)
  } catch (error) {
    writeResponse(ctx, 500)
    return
  }

  const [challengeVisible, challengeHidden] = challenge

  writeResponse(ctx, 200, { sessionKey, challengeVisible, challengeHidden })
}

module.exports = handleSignInSessionStart
