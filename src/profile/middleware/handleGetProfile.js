const { writeResponse } = require('../../common/lib')
const { serializeProfile } = require('../lib')

async function handleGetProfile (ctx) {
  const { profile } = ctx.state

  if (profile === null) {
    writeResponse(ctx, 404, { errors: { profile: 'not found' } })
    return
  }

  writeResponse(ctx, 200, serializeProfile(profile))
}

module.exports = handleGetProfile
