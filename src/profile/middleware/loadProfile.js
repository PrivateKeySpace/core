const { DB_ERROR_ROW_DOES_NOT_EXIST } = require('../../common/constants')
const { writeResponse } = require('../../common/lib')
const { findProfileByAuthHashId } = require('../storage')

async function loadProfile (ctx, next) {
  const { tokenPayload: { authHashId } } = ctx.state
  let profile

  try {
    profile = await findProfileByAuthHashId(authHashId)
  } catch (error) {
    console.log(error)
    if (error !== DB_ERROR_ROW_DOES_NOT_EXIST) {
      writeResponse(ctx, 500)
      return
    }
  }

  if (typeof profile === 'undefined') {
    ctx.state.profile = null
  } else {
    profile.data = JSON.parse(profile.data) // TODO : profile decryption
    ctx.state.profile = profile
  }

  await next()
}

module.exports = loadProfile
