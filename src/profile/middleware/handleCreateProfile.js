const { isEmpty } = require('lodash')
const { writeResponse } = require('../../common/lib')
const { createHashId } = require('../../common/lib/crypto')
const { validateCreateProfilePayload } = require('../lib')

async function handleCreateProfile (ctx) {
  const requestPayload = ctx.request.body

  {
    const validationErrors = validateCreateProfilePayload(requestPayload)

    if (!isEmpty(validationErrors)) {
      writeResponse(ctx, 400, { errors: validationErrors })
      return
    }
  }

  {
    const { profile } = ctx.state
    if (profile !== null) {
      writeResponse(ctx, 409, { errors: { profile: 'already exists' } })
      return
    }
  }

  const { tokenPayload: { authHashId } } = ctx.state
  const { pivotXPublicKey } = requestPayload
  const pivotHashId = createHashId(pivotXPublicKey)

  console.log(authHashId, pivotHashId)
  // TODO

  writeResponse(ctx, 201)
}

module.exports = handleCreateProfile
