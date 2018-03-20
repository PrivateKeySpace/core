const { writeResponse } = require('../../common/lib')
const { generateSignInChallenge } = require('../lib')
const { createSignInSessionForChallenge } = require('../storage')

async function handleSignInSessionStart (ctx) {
  const challenge = generateSignInChallenge()

  let sessionKey

  try {
    sessionKey = await createSignInSessionForChallenge(challenge)
  } catch (error) {
    writeResponse(ctx, 500)
    return
  }

  const [challengeVisible, challengeHidden] = challenge

  writeResponse(ctx, 200, { sessionKey, challengeVisible, challengeHidden })
}

module.exports = handleSignInSessionStart
