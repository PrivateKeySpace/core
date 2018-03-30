const { writeResponse } = require('../../common/lib')

async function handleCreateProfile (ctx) {
  writeResponse(ctx, 204)
}

module.exports = handleCreateProfile
