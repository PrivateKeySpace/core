const { writeResponse } = require('../lib')

async function handleHealthCheck (ctx) {
  writeResponse(ctx, 200)
}

module.exports = handleHealthCheck
