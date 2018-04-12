const { isEmpty } = require('lodash')
const { DB_ERROR_ROW_DOES_NOT_EXIST } = require('../../common/constants')
const { writeResponse } = require('../../common/lib')
const { createHashId } = require('../../common/lib/crypto')
const { PROFILE_VERSION_0 } = require('../constants')
const { validateCreateProfilePayload, serializeProfile } = require('../lib')
const { findProfileByAuthHashId, findProfileByPivotHashId, createProfile, updateProfileByPivotHashId } = require('../storage')

async function handleCreateProfile (ctx) {
  const requestPayload = ctx.request.body

  {
    const validationErrors = validateCreateProfilePayload(requestPayload)

    if (!isEmpty(validationErrors)) {
      writeResponse(ctx, 400, { errors: validationErrors })
      return
    }
  }

  const { tokenPayload: { authHashId } } = ctx.state
  let profile

  try {
    profile = await findProfileByAuthHashId(authHashId)
  } catch (error) {
    if (error !== DB_ERROR_ROW_DOES_NOT_EXIST) {
      writeResponse(ctx, 500)
      return
    }
  }

  if (typeof profile !== 'undefined') {
    writeResponse(ctx, 409, { errors: { profile: 'already exists' } })
    return
  }

  const { pivotXPublicKey } = requestPayload
  const pivotHashId = createHashId(pivotXPublicKey)

  try {
    profile = await findProfileByPivotHashId(pivotHashId)
  } catch (error) {
    if (error !== DB_ERROR_ROW_DOES_NOT_EXIST) {
      writeResponse(ctx, 500)
      return
    }
  }

  if (typeof profile === 'undefined') {
    const profileData = {
      pivotHashId,
      authHashIds: [authHashId],
      data: {
        version: PROFILE_VERSION_0,
        pivotXPublicKey
      }
    }

    profileData.data = JSON.stringify(profileData.data) // TODO : profile encryption

    try {
      profile = await createProfile(profileData)
    } catch (error) {
      writeResponse(ctx, 500)
      return
    }
  } else {
    const profileData = { authHashIds: [...profile.authHashIds, authHashId] }

    profileData.data = JSON.stringify(profileData.data) // TODO : profile encryption

    try {
      profile = await updateProfileByPivotHashId(pivotHashId, profileData)
    } catch (error) {
      writeResponse(ctx, 500)
      return
    }
  }

  writeResponse(ctx, 201, serializeProfile(profile))
}

module.exports = handleCreateProfile
