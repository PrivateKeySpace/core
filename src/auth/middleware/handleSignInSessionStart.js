const { writeResponse } = require('../../common/lib')
const { generateChallenge } = require('../lib')
const { createSession } = require('../storage')

async function handleSignInSessionStart (ctx) {
  const challenge = generateChallenge()
  const [challengeVisible, challengeHidden] = challenge

  let sessionId

  try {
    sessionId = createSession(challenge)
  } catch (error) {
    writeResponse(ctx, 500, { error })
    return
  }

  writeResponse(ctx, 200, { sessionId, challengeVisible, challengeHidden })
}

module.exports = handleSignInSessionStart
