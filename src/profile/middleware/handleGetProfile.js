const { writeResponse } = require('../../common/lib')

async function handleGetProfile (ctx) {
  writeResponse(ctx, 204)
}

module.exports = handleGetProfile
