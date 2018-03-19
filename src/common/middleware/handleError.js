const { ENV } = require('../config')
const { writeResponse } = require('../lib')
const { log, LOG_LEVEL_ERROR } = require('../logging')
const { ENV_DEVELOPMENT } = require('../constants')

async function handleError (ctx, next) {
  try {
    await next()
  } catch (error) {
    if (ENV === ENV_DEVELOPMENT) {
      console.log(error)
    }

    log(LOG_LEVEL_ERROR, 'app/common/middleware/handleError: error', { error, stack: error.stack })

    writeResponse(ctx, 500)
  }
}

module.exports = handleError
