const createBodyParserMiddleware = require('koa-bodyparser')

const parseJsonBody = createBodyParserMiddleware({
  enableTypes: ['json'],
  encode: 'utf-8',
  jsonLimit: '512kb',
  strict: true
})

module.exports = parseJsonBody
