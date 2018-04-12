const { writeResponse } = require('../../common/lib')
const { serializeProfile } = require('../lib')

async function handleGetProfile (ctx) {
  const { profile } = ctx.state
  writeResponse(ctx, 200, serializeProfile(profile))
}

module.exports = handleGetProfile
