const { LOG_LEVEL } = require('./config')

const LOG_LEVEL_ERROR = 0
const LOG_LEVEL_WARN = 1
const LOG_LEVEL_INFO = 2
const LOG_LEVEL_DEBUG = 3

function log (level, message, properties) {
  if (level > LOG_LEVEL) {
    return
  }

  const timestamp = Date.now()
  const entry = { timestamp, level, message, ...properties }
  const entryString = JSON.stringify(entry)

  console.log(entryString)
}

module.exports = {
  LOG_LEVEL_ERROR,
  LOG_LEVEL_WARN,
  LOG_LEVEL_INFO,
  LOG_LEVEL_DEBUG,
  log
}
