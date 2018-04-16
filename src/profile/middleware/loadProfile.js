const { DB_ERROR_ROW_DOES_NOT_EXIST } = require('../../common/constants')
const { writeResponse } = require('../../common/lib')
const { findProfileByAuthHashId } = require('../storage')

async function loadProfile (ctx, next) {
  const { tokenPayload: { authHashId } } = ctx.state
  let profile

  try {
    profile = await findProfileByAuthHashId(authHashId)
  } catch (error) {
    if (error === DB_ERROR_ROW_DOES_NOT_EXIST) {
      writeResponse(ctx, 404, { errors: { profile: 'not found' } })
      return
    }
    writeResponse(ctx, 500)
    return
  }

  profile.data = JSON.parse(profile.data) // TODO : profile decryption
  ctx.state.profile = profile

  await next()
}

module.exports = loadProfile
