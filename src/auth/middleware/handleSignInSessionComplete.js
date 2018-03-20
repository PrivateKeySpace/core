const { DB_ERROR_ROW_DOES_NOT_EXIST } = require('../../common/constants')
const { writeResponse } = require('../../common/lib')
const { TOKEN_TTL } = require('../constants')
const { validateSignInSessionCompletePayload, verifySignInChallengeSignature, createToken } = require('../lib')
const { getChallengeBySignInSessionKey } = require('../storage')

async function handleSignInSessionComplete (ctx) {
  const requestPayload = ctx.request.body

  {
    const validationErrors = validateSignInSessionCompletePayload(requestPayload)
    const isPayloadValid = Object.keys(validationErrors).length > 0

    if (!isPayloadValid) {
      writeResponse(ctx, 400, { errors: validationErrors })
      return
    }
  }

  const { sessionKey } = requestPayload
  let challenge

  try {
    challenge = await getChallengeBySignInSessionKey(sessionKey)
  } catch (error) {
    if (error === DB_ERROR_ROW_DOES_NOT_EXIST) {
      writeResponse(ctx, 404, { errors: { session: 'not found' } })
      return
    }
    writeResponse(ctx, 500)
    return
  }

  const { signature, version } = requestPayload
  const isSignatureValid = verifySignInChallengeSignature(signature, challenge, version)

  if (!isSignatureValid) {
    writeResponse(ctx, 401, { errors: { signature: 'invalid' } })
    return
  }

  const tokenPayload = {} // TODO
  let token

  try {
    token = await createToken(tokenPayload, TOKEN_TTL)
  } catch (error) {
    writeResponse(ctx, 500)
    return
  }

  writeResponse(ctx, 200, { token })
}

module.exports = handleSignInSessionComplete
