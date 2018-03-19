const Router = require('koa-router')
const handleHealthCheck = require('./handleHealthCheck')

const router = new Router()

router
  .get('/health', handleHealthCheck)

const routes = router.routes()

module.exports = routes
