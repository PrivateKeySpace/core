const { isEmpty } = require('lodash')
const { writeResponse } = require('../../common/lib')
const { createHashId } = require('../../common/lib/crypto')
const { PROFILE_VERSION_0 } = require('../constants')
const { validateCreateProfilePayload, serializeProfile } = require('../lib')
const { createProfile } = require('../storage')

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
  const profileData = {
    pivotHashId,
    authHashIds: [authHashId],
    data: {
      version: PROFILE_VERSION_0,
      pivotXPublicKey
    }
  }

  profileData.data = JSON.stringify(profileData.data) // TODO : profile encryption

  let profile

  try {
    profile = await createProfile(profileData)
  } catch (error) {
    writeResponse(ctx, 500)
    return
  }

  writeResponse(ctx, 201, serializeProfile(profile))
}

module.exports = handleCreateProfile
