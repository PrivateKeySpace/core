const { writeResponse } = require('../../common/lib')
const { generateChallenge } = require('../lib')
const { createSession } = require('../storage')

async function handleSignInSessionStart (ctx) {
  const challenge = generateChallenge()
  const [challengeVisible, challengeHidden] = challenge

  let sessionKey

  try {
    sessionKey = await createSession(challenge)
  } catch (error) {
    writeResponse(ctx, 500)
    return
  }

  writeResponse(ctx, 200, { sessionKey, challengeVisible, challengeHidden })
}

module.exports = handleSignInSessionStart
