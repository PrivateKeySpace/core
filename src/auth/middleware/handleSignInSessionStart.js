const { writeResponse } = require('../../common/lib')

async function handleSignInSessionStart (ctx) {
  writeResponse(ctx, 404)
}

module.exports = handleSignInSessionStart
