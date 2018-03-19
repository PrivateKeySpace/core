const { writeResponse } = require('../../common/lib')

async function handleSignInSessionComplete (ctx) {
  writeResponse(ctx, 404)
}

module.exports = handleSignInSessionComplete
