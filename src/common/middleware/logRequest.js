const { log, LOG_LEVEL_DEBUG } = require('../logging')

async function logRequest (ctx, next) {
  {
    const logEntryPayload = {
      method: ctx.request.method,
      url: ctx.request.href,
      ip: ctx.request.ip
    }
    log(LOG_LEVEL_DEBUG, 'common/middleware/logRequest: request', logEntryPayload)
  }

  const requestTime = Date.now()

  await next()

  const responseTime = Date.now()

  {
    const logEntryPayload = {
      status: ctx.response.status,
      time: (responseTime - requestTime)
    }
    log(LOG_LEVEL_DEBUG, 'common/middleware/logRequest: response', logEntryPayload)
  }
}

module.exports = logRequest
