const { ENV } = require('../config')
const { log, LOG_LEVEL_ERROR } = require('../logging')
const { ENV_DEVELOPMENT } = require('../constants')
const writeResponse = require('./writeResponse')

function handleError (error, ctx) {
  if (ENV === ENV_DEVELOPMENT) {
    console.log(error)
  }

  log(LOG_LEVEL_ERROR, 'app/common/lib/handleError: error', { error, stack: error.stack })

  if (ctx) {
    writeResponse(ctx, 500)
  }
}

module.exports = handleError
