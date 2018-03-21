const { isEmpty } = require('lodash')
const { DB_ERROR_ROW_DOES_NOT_EXIST } = require('../../common/constants')
const { writeResponse } = require('../../common/lib')
const { TOKEN_TTL } = require('../constants')
const { validateSignInSessionCompletePayload, verifySignInChallengeSignature, createHashId, createToken } = require('../lib')
const { findSignInSessionByKey, deleteSignInSessionByKey } = require('../storage')

async function handleSignInSessionComplete (ctx) {
  const requestPayload = ctx.request.body

  {
    const validationErrors = validateSignInSessionCompletePayload(requestPayload)

    if (!isEmpty(validationErrors)) {
      writeResponse(ctx, 400, { errors: validationErrors })
      return
    }
  }

  const { sessionKey } = requestPayload
  let session

  try {
    session = await findSignInSessionByKey(sessionKey)
  } catch (error) {
    if (error === DB_ERROR_ROW_DOES_NOT_EXIST) {
      writeResponse(ctx, 404, { errors: { session: 'not found' } })
      return
    }
    writeResponse(ctx, 500)
    return
  }

  const { challenge } = session
  const { signature, publicKey, implementation } = requestPayload
  const isSignatureValid = verifySignInChallengeSignature(signature, publicKey, challenge, implementation)

  if (!isSignatureValid) {
    writeResponse(ctx, 401, { errors: { signature: 'invalid' } })
    return
  }

  const authHashId = createHashId(publicKey)
  const tokenPayload = { authHashId }
  let token

  try {
    token = await createToken(tokenPayload, TOKEN_TTL)
  } catch (error) {
    writeResponse(ctx, 500)
    return
  }

  writeResponse(ctx, 200, { token })

  try {
    await deleteSignInSessionByKey(sessionKey)
  } catch (ignored) {}
}

module.exports = handleSignInSessionComplete
