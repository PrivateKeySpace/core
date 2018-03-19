const logRequest = require('./logRequest')
const handleError = require('./handleError')
const parseJsonBody = require('./parseJsonBody')
const routes = require('./routes')

module.exports = {
  logRequest,
  handleError,
  parseJsonBody,
  routes
}
